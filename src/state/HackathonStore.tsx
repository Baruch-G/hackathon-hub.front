import { create } from 'zustand'
import { Comment, Hackathon } from '../components/hackathonList/HackathonList';

interface HackathonState {
    hackathons: Hackathon[];
    toggleLike: (hackathonId: string, userId: string) => void;
    updateHackathon: (hackathons: Hackathon) => void;
    setHackathons: (hackathons: Hackathon[]) => void
    addComment: (hackathonId: string, comment: Comment) => void
    addHackathon: (hackathon: Hackathon) => void
}

const useHackathonStore = create<HackathonState>((set) => ({
    hackathons: [],
    toggleLike: async (hackathonId: string, userId: string) => {
        set((state) => ({
            hackathons: state.hackathons.map(hackathon =>
                hackathon._id === hackathonId
                    ? { ...hackathon, likes: hackathon.likes.includes(userId) ? hackathon.likes.filter(id => id !== userId) : [...hackathon.likes, userId] }
                    : hackathon
            )
        }));
    },
    setHackathons: (hackathons: Hackathon[]) => {
        set((state) => ({
            hackathons: hackathons
        }))
    },
    addHackathon: (hackathon: Hackathon) => {
        set((state) => ({
            hackathons: [...state.hackathons, hackathon]
        }))
    },
    updateHackathon: (updatedHackathon: Hackathon) => {
        set((state) => ({
            hackathons: state.hackathons.map(hackathon =>
                hackathon._id === updatedHackathon._id
                    ? updatedHackathon
                    : hackathon
            )
        }));
    },
    addComment: (hackathonId: string, comment: Comment) => {
        set((state) => ({
            hackathons: state.hackathons.map(hackathon =>
                hackathon._id === hackathonId
                    ? { ...hackathon, comments: [...hackathon.comments, comment] }
                    : hackathon
            )
        }));
    }
}));

export default useHackathonStore
