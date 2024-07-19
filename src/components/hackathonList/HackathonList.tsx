import { useState, useEffect } from 'react';
import './HackathonList.css';
import { FaRegCommentDots } from 'react-icons/fa';
import CommentForm from '../commentForm/CommentForm';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaRegComment } from "react-icons/fa6";
import { Divider } from '@mui/material';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { getHackathons } from '../../api/DataFetch';
import useUserStore from '../../state/UserStore';

interface User {
    imgUrl: string;
    firstName: string;
    lastName: string;
    email: string
    _id: string
}

interface Location {
    lon: number,
    lat: number,
}
interface Comment {
    text: string;
    user: User;
    _id: string
}

interface Hackathon {
    _id: string;
    creator: User;
    location: Location;
    description: string;
    startDate: string;
    endDate: string;
    comments: Comment[];
    likes: string[];
    imgs: string[];
    dateCreated: string;
}

// const mockHackathons: Hackathon[] = [
//     {
//         id: 1,
//         creator: {
//             firstName: "Alice",
//             lastName: "Gub",
//             img: 'https://picsum.photos/200/300?random=1'
//         },
//         location: 12345,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida eros a dui commodo fermentum.',
//         startDate: "2024-07-05T15:02:30.322Z",
//         endDate: "2024-07-05T15:02:30.322Z",
//         comments: [
//             { text: 'Great event!', user: { firstName: "John", lastName: "Doe", img: 'https://picsum.photos/200/300?random=7' } },
//             { text: 'Had a lot of fun! Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun Had a lot of fun ', user: { firstName: "Jane", lastName: "Doe", img: 'https://picsum.photos/200/300?random=8' } }
//         ],
//         imgs: ['https://picsum.photos/200/300?random=1', 'https://picsum.photos/200/300?random=2'],
//         like: false,
//         dateCreated: '2024-07-05T15:02:30.322Z'
//     },
//     {
//         id: 2,
//         creator: {
//             firstName: "Bob",
//             lastName: "Gub",
//             img: 'https://picsum.photos/200/300?random=2'
//         },
//         location: 67890,
//         description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
//         startDate: "2024-07-05T15:02:30.322Z",
//         endDate: "2024-07-05T15:02:30.322Z",
//         comments: [
//             { text: 'Well organized', user: { firstName: "Alice", lastName: "Smith", img: 'https://picsum.photos/200/300?random=9' } },
//             { text: 'Learned a lot!', user: { firstName: "Bob", lastName: "Brown", img: 'https://picsum.photos/200/300?random=10' } }
//         ],
//         imgs: ['https://picsum.photos/200/300?random=3', 'https://picsum.photos/200/300?random=4'],
//         like: false,
//         dateCreated: '2024-07-05T15:02:30.322Z'
//     },
//     {
//         id: 3,
//         creator: {
//             firstName: "Charlie",
//             lastName: "Gub",
//             img: 'https://picsum.photos/200/300?random=3'
//         },
//         location: 54321,
//         description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
//         startDate: "2024-07-05T15:02:30.322Z",
//         endDate: "2024-07-05T15:02:30.322Z",
//         comments: [
//             { text: 'Amazing experience!', user: { firstName: "Charlie", lastName: "Johnson", img: 'https://picsum.photos/200/300?random=11' } },
//             { text: 'Will join again next year!', user: { firstName: "David", lastName: "Lee", img: 'https://picsum.photos/200/300?random=12' } }
//         ],
//         imgs: ['https://picsum.photos/200/300?random=5', 'https://picsum.photos/200/300?random=6'],
//         like: true,
//         dateCreated: '2024-07-05T15:02:30.322Z'
//     }
// ];

const HackathonList = () => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [showComments, setShowComments] = useState<boolean[]>([]);
    const user = useUserStore(store => store.user);

    useEffect(() => {
        const initialShowComments = Array.from({ length: [].length }, () => false);
        setShowComments(initialShowComments);

        getHackathons().then(res => {
            setHackathons(res); // res should be set
            console.log(res);
        }).catch(e => {
            console.error(e);
        })

    }, []);

    const handleLike = (id: string) => {
        if (!user?._id) return // infor err via popup 

        const updatedHackathons = hackathons.map(hackathon => {
            if (hackathon._id === id) {
                return { ...hackathon, likes: [...hackathon.likes, user._id] }
            }
            return hackathon;
        });
        setHackathons(updatedHackathons);

        // ipmplement
        //likeHackathon()
    };

    const handleEdit = (id: number) => {
        console.log(`Edit hackathon with ID: ${id}`);
    };

    const handleAddComment = (id: string, comment: string) => {
        //TODO":
        // const updatedHackathons = hackathons.map(hackathon => {
        //     if (hackathon._id === id) {
        //         return {
        //             ...hackathon,
        //             comments: [...hackathon.comments, { text: comment, user: { firstName: "You", lastName: "User", img: 'https://picsum.photos/200/300?random=13' } }]
        //         };
        //     }
        //     return hackathon;
        // });
        // setHackathons(updatedHackathons);
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
                <div className="hackathon-item" key={hackathon._id}>
                    <div className="hackathon-header">
                        <div className='hackthon-poster-profile'>
                            <img src={hackathon.creator.imgUrl} alt={`${hackathon.creator.firstName} ${hackathon.creator.lastName}`} className="profile-img" />
                            <div className='hackathon-poster-name'>{hackathon.creator.firstName} {hackathon.creator.lastName}</div>
                        </div>
                        <div className='location-details'>
                            <HiOutlineLocationMarker />
                            <p>{hackathon.location.lon}</p>
                        </div>
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
                        <div className='action-container'>
                            {hackathon.likes?.some(l => l === user?._id) ? <FaHeart className="icon-button icon-fill" onClick={() => handleLike(hackathon._id)} /> : <FaRegHeart className="icon-button" onClick={() => handleLike(hackathon._id)} />}
                            <div className='num-likes'>{hackathon.likes?.length}</div>
                        </div>

                        <div className='action-container'>
                            {showComments[index] ? <FaRegComment className="icon-button icon-fill" onClick={() => toggleComments(index)} /> : <FaRegCommentDots className="icon-button" onClick={() => toggleComments(index)} />}
                            <div className='num-comments'>{hackathon.comments.length}</div>
                        </div>
                        {/* <FiEdit className="icon-button" onClick={() => handleEdit(hackathon.id)} /> */}
                    </div>
                    <div className="hackathon-comments">
                        {showComments[index] && (
                            <>
                                <div className="comment-list">
                                    {hackathon.comments.map((comment, idx) => (
                                        <>
                                            <Divider orientation='horizontal' />
                                            <div className='comment' key={idx}>
                                                <div className='comment-profile-img-container'>
                                                    <img src={comment.user.imgUrl} alt={`${comment.user.firstName} ${comment.user.lastName}`} className="profile-img" />
                                                </div>
                                                <div className='comment-t'>{comment.text}</div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                                <CommentForm hackathonId={hackathon._id} onAddComment={handleAddComment} />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HackathonList;
