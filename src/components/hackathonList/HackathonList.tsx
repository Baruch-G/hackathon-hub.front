import { useState, useEffect } from 'react';
import './HackathonList.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons from react-icons
import CommentForm from '../commentForm/CommentForm';

interface Hackathon {
    id: number;
    creator: string;
    location: number;
    description: string;
    startDate: string;
    endDate: string;
    comments: string[];
    imgs: string[];
}

const mockHackathons: Hackathon[] = [
    {
        id: 1,
        creator: 'Alice',
        location: 12345,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida eros a dui commodo fermentum.',
        startDate: "2024-07-05T15:02:30.322Z",
        endDate: "2024-07-05T15:02:30.322Z",
        comments: ['Great event!', 'Had a lot of fun!'],
        imgs: ['https://picsum.photos/200/300?random=1', 'https://picsum.photos/200/300?random=2']
    },
    {
        id: 2,
        creator: 'Bob',
        location: 67890,
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        startDate: "2024-07-05T15:02:30.322Z",
        endDate: "2024-07-05T15:02:30.322Z",
        comments: ['Well organized', 'Learned a lot!'],
        imgs: ['https://picsum.photos/200/300?random=3', 'https://picsum.photos/200/300?random=4']
    },
    {
        id: 3,
        creator: 'Charlie',
        location: 54321,
        description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
        startDate: "2024-07-05T15:02:30.322Z",
        endDate: "2024-07-05T15:02:30.322Z",
        comments: ['Amazing experience!', 'Will join again next year!'],
        imgs: ['https://picsum.photos/200/300?random=5', 'https://picsum.photos/200/300?random=6']
    }
];

const HackathonList = () => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [showComments, setShowComments] = useState<boolean[]>([]);

    useEffect(() => {
        // Initialize showComments state for each hackathon to false initially
        const initialShowComments = Array.from({ length: mockHackathons.length }, () => false);
        setShowComments(initialShowComments);

        // Simulate an API call
        setHackathons(mockHackathons);
    }, []);

    const handleLike = (id: number) => {
        // Handle like functionality
        console.log(`Liked hackathon with ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        // Handle edit functionality
        console.log(`Edit hackathon with ID: ${id}`);
    };

    const handleAddComment = (id: number, comment: string) => {
        const updatedHackathons = hackathons.map(hackathon => {
            if (hackathon.id === id) {
                return {
                    ...hackathon,
                    comments: [...hackathon.comments, comment]
                };
            }
            return hackathon;
        });
        setHackathons(updatedHackathons);
    };

    const toggleComments = (index: number) => {
        setShowComments(prev => {
            const newShowComments = [...prev];
            newShowComments[index] = !newShowComments[index];
            return newShowComments;
        });
    };

    return (
        <div className="hackathon-list">
            {hackathons.map((hackathon, index) => (
                <div className="hackathon-item" key={hackathon.id}>
                    <div className="hackathon-header">
                        <h2>Creator: {hackathon.creator}</h2>
                        <p>Location: {hackathon.location}</p>
                    </div>
                    <div className="hackathon-details">
                        <p>{hackathon.description}</p>
                        <p>{hackathon.startDate}</p>
                        <div className="hackathon-images">
                            {hackathon.imgs.map((img, idx) => (
                                <img key={idx} src={img} alt={`Hackathon ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                    <div className="hackathon-actions">
                        <button className="like-button" onClick={() => handleLike(hackathon.id)}>Like</button>
                        <button className="edit-button" onClick={() => handleEdit(hackathon.id)}>Edit</button>
                    </div>
                    <div className="hackathon-comments">
                        <h3 style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            Comments
                            <span onClick={() => toggleComments(index)}>
                                {showComments[index] ? <FaAngleUp /> : <FaAngleDown />}
                            </span>
                        </h3>
                        {showComments[index] && (
                            <ul className="comment-list">
                                {hackathon.comments.map((comment, idx) => (
                                    <li key={idx}>{comment}</li>
                                ))}
                            </ul>
                        )}
                        {showComments[index] && (
                            <CommentForm hackathonId={hackathon.id} onAddComment={handleAddComment} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HackathonList;
