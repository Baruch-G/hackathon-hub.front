import { useState, useEffect } from 'react';
import './HackathonList.css';
import { FaRegCommentDots } from 'react-icons/fa';
import CommentForm from '../commentForm/CommentForm';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaDeleteLeft, FaRegComment } from "react-icons/fa6";
import { Divider } from '@mui/material';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { addComment, getHackathons, likeHackathon } from '../../api/DataFetch';
import useUserStore from '../../state/UserStore';
import useHackathonStore from '../../state/HackathonStore';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from "react-icons/ri";

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
export interface Comment {
    text: string;
    user: User;
    _id: string
}

export interface Hackathon {
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

const HackathonList = () => {
    // const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [showComments, setShowComments] = useState<boolean[]>([]);
    const user = useUserStore(store => store.user);
    const { hackathons, setHackathons, toggleLike, updateHackathon } = useHackathonStore(store => store);

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
        // fire and forget
        toggleLike(id, user._id)
        likeHackathon(id, user._id)
    };

    const handleEdit = (id: number) => {
        console.log(`Edit hackathon with ID: ${id}`);
    };

    const handleAddComment = (id: string, comment: string) => {
        if (!user?._id) return // infor err via popup 
        addComment(id, user._id, comment).then(res => {
            if (res?.data) {
                console.log(hackathons);
                updateHackathon(res.data)
                updateHackathon(res.data)
                console.log(hackathons);
            }
        })
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

                            {
                                user?._id === hackathon.creator._id && <div className='own-user-actions'>
                                    <CiEdit className='icon-button' />
                                    <RiDeleteBin6Line className='icon-button' />
                                </div>
                            }
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
                                <img key={img} src={img} alt={`Hackathon ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                    <div className="hackathon-actions">
                        <div className='action-container'>
                            {hackathon.likes.includes(user?._id ?? '') ?
                                <FaHeart className="icon-button icon-fill" onClick={() => handleLike(hackathon._id)} /> :
                                <FaRegHeart className="icon-button" onClick={() => handleLike(hackathon._id)} />}
                            <div className='num-likes'>{hackathon.likes.length}</div>
                        </div>

                        <div className='action-container'>
                            {showComments[index] ?
                                <FaRegComment className="icon-button icon-fill" onClick={() => toggleComments(index)} /> :
                                <FaRegCommentDots className="icon-button" onClick={() => toggleComments(index)} />}
                            <div className='num-comments'>{hackathon.comments.length}</div>
                        </div>
                    </div>
                    <div className="hackathon-comments">
                        {showComments[index] && (
                            <>
                                <div className="comment-list">
                                    {hackathon.comments.map(comment => (
                                        <>
                                            <Divider orientation='horizontal' />
                                            <div className='comment' key={comment._id}>
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
