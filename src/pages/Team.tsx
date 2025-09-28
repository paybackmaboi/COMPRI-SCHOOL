import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const members = [
  {
    name: 'Absary Mangotara',
    saying: 'Success is not the key to happiness. Happiness is the key to success.',
    photo: ''
  },
  {
    name: 'Christine Empleo',
    saying: 'Dream big, work hard, stay focused, and surround yourself with good people.',
    photo: ''
  },
  {
    name: 'John Michael Steve Bucol',
    saying: 'The future belongs to those who believe in the beauty of their dreams.',
    photo: ''
  },
  {
    name: 'Joshley Pantonial',
    saying: 'Every accomplishment starts with the decision to try.',
    photo: ''
  },
  {
    name: 'Kenneth Zamora',
    saying: 'Graduation is not the end, it’s the beginning.',
    photo: ''
  },
  {
    name: 'Pharell Matthew Castañeda',
    saying: 'Go confidently in the direction of your dreams.',
    photo: ''
  },
  {
    name: 'Rhon Harry Lavarez',
    saying: 'The best way to predict the future is to create it.',
    photo: ''
  },
  {
    name: 'Sedrick P Nudalo',
    saying: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    photo: ''
  }
];

const Team = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState(members);

  // Handle photo upload
  const handlePhotoChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeam(prev => prev.map((m, i) => i === idx ? { ...m, photo: typeof reader.result === 'string' ? reader.result : '' } : m));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <Card className="p-10 rounded-3xl shadow-2xl bg-slate-900/70 border border-purple-800 max-w-6xl w-full animate-fade-in relative backdrop-blur-sm">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="absolute left-6 top-6 text-gray-300 border-purple-800 bg-slate-800/40 hover:bg-purple-900/40"
        >
          ← Back
        </Button>
        <div className="mb-8 flex flex-col items-center">
          <div className="p-4 rounded-full bg-gradient-to-br from-purple-800 via-slate-800 to-purple-900 shadow-lg mb-2 animate-pulse">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="22" ry="22" fill="url(#teamEgg)" /><defs><radialGradient id="teamEgg" cx="0.5" cy="0.5" r="0.7" fx="0.5" fy="0.5"><stop offset="0%" stopColor="#581c87" /><stop offset="50%" stopColor="#4c1d95" /><stop offset="100%" stopColor="#1e293b" /></radialGradient></defs></svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Intelligent User's Team</h1>
          <p className="mb-6 text-center text-lg text-gray-400">Meet the brilliant minds behind this system</p>
        </div>
        {/* Grid layout for members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center bg-gradient-to-br from-slate-800 to-purple-900/50 rounded-2xl p-7 shadow-md hover:scale-[1.03] transition-transform border border-purple-800">
              {/* Member photo or initials */}
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full object-cover border-4 border-purple-600 mb-3 shadow" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 via-purple-800 to-slate-700 flex items-center justify-center text-3xl font-bold border-4 border-purple-600 mb-3 shadow text-purple-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <label className="mb-2 text-xs text-blue-500 cursor-pointer hover:underline">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handlePhotoChange(e, idx)}
                />
                Upload Photo
              </label>
                <div className="font-semibold text-lg text-gray-200 text-center mb-2">{member.name}</div>
              <div className="italic text-sm text-gray-500 text-center">“{member.saying}”</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-xs text-gray-500">IU'S &copy; 2025 | Legacy Feature</div>
      </Card>
    </div>
  );
};

export default Team;
