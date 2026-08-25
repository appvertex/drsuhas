import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock } from 'lucide-react';

const chapters = [
  { id: 1, title: 'State-of-the-Art OT', time: 0, duration: '0:00' },
  { id: 2, title: 'Advanced Diagnostics', time: 5, duration: '0:05' },
  { id: 3, title: 'Recovery Suites', time: 10, duration: '0:10' },
  { id: 4, title: 'Patient Waiting Area', time: 15, duration: '0:15' },
];

export default function ClinicTour() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const jumpToChapter = (chapter) => {
    if (videoRef.current) {
      videoRef.current.currentTime = chapter.time;
      videoRef.current.play();
      setIsPlaying(true);
      setActiveChapter(chapter.id);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    
    // Find the active chapter based on current video time
    let current = chapters[0].id;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (time >= chapters[i].time) {
        current = chapters[i].id;
        break;
      }
    }
    if (activeChapter !== current) {
      setActiveChapter(current);
    }
  };

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Virtual Walkthrough</div>
          <h2 className="h-2">Experience our <span className="text-gradient">Facility</span></h2>
          <p className="text-body" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            Take a cinematic tour of our world-class surgical center, designed entirely around your safety and comfort.
          </p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Video Player Frame */}
          <div style={{ 
            position: 'relative', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(222, 200, 152, 0.2)',
            aspectRatio: '16/9',
            backgroundColor: '#000'
          }}>
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-medical-team-performing-an-operation-in-an-operating-room-41916-large.mp4"
              poster="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onTimeUpdate={handleTimeUpdate}
              controls={false}
              playsInline
            />
            
            {/* Custom Play/Pause Overlay */}
            {!isPlaying && (
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: 'rgba(6, 11, 17, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                onClick={togglePlay}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(222, 200, 152, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(222, 200, 152, 0.5)',
                    color: '#000'
                  }}
                >
                  <Play size={32} style={{ marginLeft: '4px' }} fill="currentColor" />
                </motion.div>
              </div>
            )}
            
            {/* Invisible clickable overlay to pause when playing */}
            {isPlaying && (
              <div 
                style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: 'pointer' }}
                onClick={togglePlay}
              />
            )}
          </div>

          {/* Interactive Chapters List */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 className="h-3" style={{ fontSize: '1.125rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--accent-gold)" />
              Video Chapters
            </h3>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              overflowX: 'auto', 
              paddingBottom: '1rem',
              WebkitOverflowScrolling: 'touch',
            }} className="hide-scrollbar">
              {chapters.map((chapter) => (
                <motion.button
                  key={chapter.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => jumpToChapter(chapter)}
                  style={{
                    flex: '0 0 auto',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: `1px solid ${activeChapter === chapter.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                    backgroundColor: activeChapter === chapter.id ? 'rgba(222, 200, 152, 0.08)' : 'var(--bg-primary)',
                    color: activeChapter === chapter.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    minWidth: '180px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    letterSpacing: '0.05em', 
                    backgroundColor: activeChapter === chapter.id ? 'var(--accent-gold)' : 'var(--border-strong)', 
                    color: activeChapter === chapter.id ? '#000' : 'var(--text-primary)',
                    padding: '4px 10px', 
                    borderRadius: '99px', 
                    transition: 'all 0.3s ease'
                  }}>
                    {chapter.duration}
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 500, textAlign: 'left', lineHeight: 1.3 }}>
                    {chapter.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
