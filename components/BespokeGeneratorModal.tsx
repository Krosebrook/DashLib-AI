
import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Code, Loader2, Copy, Wand2, Terminal, Lightbulb, Check, Zap, Users, Trash2, Image as ImageIcon, Database, Mic, MicOff, UploadCloud, Download } from 'lucide-react';
import { generateCustomDashboardStream } from '../services/geminiService';
import { usePersistentState } from '../hooks/usePersistentState';
import { openInStackBlitz, downloadStandaloneHTML } from '../utils/exportUtils';
import { createPcmBlob, decodeAudioData } from '../utils/audioUtils';
import { BrandConfig, Persona } from '../types';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface BespokeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandConfig?: BrandConfig;
}

const INSPIRATION_PROMPTS = [
  "Supply Chain Logistics & Global Delay Tracker",
  "SaaS Growth Engine: Churn vs Acquisition Strategy",
  "Financial Risk Portfolio with Real-time Stress Tests",
  "Cybersecurity Threat Map & SOC Vulnerability Feed",
];

const PERSONAS: Persona[] = ['Executive', 'Analyst', 'Developer'];

const BespokeGeneratorModal: React.FC<BespokeGeneratorModalProps> = ({ isOpen, onClose, brandConfig }) => {
  // State
  const [prompt, setPrompt] = usePersistentState<string>('dashlib-generator-prompt', '');
  const [activePersona, setActivePersona] = usePersistentState<Persona>('dashlib-persona', 'Executive');
  const [activeTab, setActiveTab] = useState<'prompt' | 'vision' | 'context'>('prompt');
  
  // Inputs
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [contextData, setContextData] = useState<string>(''); // SQL or Figma JSON
  
  // Live Voice
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  
  // Generation Status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const codeRef = useRef<HTMLPreElement>(null);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const currentSessionRef = useRef<Promise<any> | null>(null);

  useEffect(() => {
    if (codeRef.current && isGenerating) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [generatedCode, isGenerating]);

  // Cleanup Audio on Close
  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() && !uploadedImage) return;
    setIsGenerating(true);
    setGeneratedCode('');
    setError('');
    
    try {
      // Clean up base64 prefix if present
      const imageClean = uploadedImage ? uploadedImage.split(',')[1] : undefined;
      
      await generateCustomDashboardStream(
        prompt, 
        (text) => setGeneratedCode(text),
        brandConfig,
        activePersona,
        imageClean,
        contextData
      );
    } catch (err) {
      setError('Connection disrupted. Please check your API key and network.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    downloadStandaloneHTML("Custom AI Dashboard", generatedCode);
  };

  // --- Gemini Live Audio Implementation ---
  const startVoiceSession = async () => {
    try {
      setIsVoiceActive(true);
      setError('');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => console.log('Gemini Live Connected'),
          onmessage: async (msg: LiveServerMessage) => {
             // Handle Input Transcription (What user said)
             if (msg.serverContent?.inputTranscription) {
                 const text = msg.serverContent.inputTranscription.text;
                 if (text) {
                     setTranscribedText(prev => prev + ' ' + text);
                     setPrompt(prev => (prev + ' ' + text).trim());
                 }
             }
             
             // Handle Audio Output (Model response)
             const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (audioData) {
               // Playback logic could go here if we want the model to "talk back"
             }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: (err) => console.error(err)
        },
        config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: { model: 'google-speech-v2' } // Enable transcription
        }
      });
      
      currentSessionRef.current = sessionPromise;

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createPcmBlob(inputData);
        sessionPromise.then(session => {
            session.sendRealtimeInput({ media: pcmBlob });
        });
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

    } catch (err) {
      console.error('Voice Session Error:', err);
      setError('Failed to access microphone or connect to Gemini Live.');
      setIsVoiceActive(false);
    }
  };

  const stopVoiceSession = () => {
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }
    if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
        audioStreamRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
    setIsVoiceActive(false);
  };

  const toggleVoice = () => {
      if (isVoiceActive) stopVoiceSession();
      else startVoiceSession();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearPrompt = () => {
      setPrompt('');
      setGeneratedCode('');
      setError('');
      setUploadedImage(null);
      setContextData('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Magic Generator
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-widest font-black">Gemini 3 Pro</span>
              </h2>
              <p className="text-sm text-slate-500 font-medium">Multimodal Synthesis Engine: Text, Vision, Voice, and Data Context.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Input Side */}
          <div className="w-1/3 border-r border-slate-100 p-0 flex flex-col bg-slate-50/50">
            
            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-4 pt-4 gap-4">
                <button 
                    onClick={() => setActiveTab('prompt')}
                    className={`pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'prompt' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    Prompt
                </button>
                <button 
                    onClick={() => setActiveTab('vision')}
                    className={`pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'vision' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    Vision
                </button>
                <button 
                    onClick={() => setActiveTab('context')}
                    className={`pb-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'context' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    Context
                </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
                <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Persona</label>
                </div>
                <div className="flex bg-white border border-slate-200 p-1 rounded-xl">
                    {PERSONAS.map(p => (
                    <button
                        key={p}
                        onClick={() => setActivePersona(p)}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all ${
                        activePersona === p 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {p}
                    </button>
                    ))}
                </div>
                </div>

                {activeTab === 'prompt' && (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-slate-400" />
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Architect Prompt</label>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={toggleVoice}
                                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md transition-all ${isVoiceActive ? 'bg-red-50 text-red-500 animate-pulse' : 'text-slate-400 hover:bg-slate-100'}`}
                                >
                                    {isVoiceActive ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                                    {isVoiceActive ? 'Listening...' : 'Dictate'}
                                </button>
                                {prompt && (
                                    <button onClick={clearPrompt} className="text-[10px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                                        <Trash2 className="w-3 h-3" /> Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <textarea
                            className="w-full p-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none text-slate-700 font-medium leading-relaxed placeholder:text-slate-300 min-h-[200px] mb-6"
                            placeholder="e.g., 'A supply chain monitoring dashboard with real-time tracking of logistics, cost efficiency per route...'"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inspiration chips</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {INSPIRATION_PROMPTS.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPrompt(p)}
                                    className="text-[10px] font-bold px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-all text-left line-clamp-1 max-w-full"
                                >
                                    {p}
                                </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'vision' && (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white hover:border-indigo-300 transition-colors relative group">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                onChange={handleImageUpload}
                            />
                            {uploadedImage ? (
                                <div className="relative w-full h-48">
                                    <img src={uploadedImage} alt="Upload" className="w-full h-full object-contain rounded-lg" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <p className="text-white font-bold text-xs">Click to replace</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                        <ImageIcon className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700">Drop a screenshot here</p>
                                    <p className="text-xs text-slate-400 mt-1">We'll replicate the layout and metrics.</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'context' && (
                    <div className="space-y-4">
                         <div className="flex items-center gap-2 mb-2">
                            <Database className="w-4 h-4 text-slate-400" />
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Schema & Logic</label>
                        </div>
                        <textarea
                            className="w-full p-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none text-slate-600 font-mono text-xs leading-relaxed placeholder:text-slate-300 min-h-[300px]"
                            placeholder={`Paste SQL Schema:\nCREATE TABLE users (...)\n\nOR Figma JSON Node:\n{ "type": "FRAME", ... }`}
                            value={contextData}
                            onChange={(e) => setContextData(e.target.value)}
                        />
                    </div>
                )}
                
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || (!prompt.trim() && !uploadedImage)}
                    className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 group active:scale-95"
                >
                {isGenerating ? (
                    <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Engineering UI...
                    </>
                ) : (
                    <>
                    <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Generate Component
                    </>
                )}
                </button>

                {error && <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
            </div>
          </div>

          {/* Output Side */}
          <div className="flex-1 flex flex-col bg-slate-900 relative">
            {!generatedCode && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-12 text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 relative group">
                  <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Code className="w-10 h-10 text-slate-600 relative z-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-300 mb-2">Workspace Ready</h3>
                <p className="max-w-xs text-sm text-slate-500">Provide a description, image, or context to see the React implementation stream into this view.</p>
              </div>
            )}

            {isGenerating && !generatedCode && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
                <p className="mt-6 font-bold text-white tracking-tight">Synthesizing Architecture...</p>
              </div>
            )}

            {generatedCode && (
              <div className="flex flex-col h-full animate-in fade-in duration-700">
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="h-4 w-px bg-slate-700 mx-2"></div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">bespoke_dashboard.tsx</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                       onClick={handleDownload}
                       className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Portable App
                    </button>
                    <button 
                       onClick={() => openInStackBlitz('Bespoke Dashboard', generatedCode)}
                       className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-500/20 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Run Live
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-lg active:scale-95 ${
                        copied ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                   <pre 
                    ref={codeRef}
                    className="h-full overflow-auto p-8 text-xs font-mono text-slate-300 leading-relaxed scroll-smooth"
                   >
                    {generatedCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokeGeneratorModal;
