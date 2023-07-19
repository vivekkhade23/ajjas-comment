import React from 'react'
import { useState } from 'react'
import style from "./Comment.module.css"
import Comment from "./Comment"

const CommentSection = () => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const [sorts, setSorts] = useState("")


    const AddComment = () => {
        const com = {
            id: new Date().getTime(),
            content: newComment,
            score: 0,
            replies: []
        }

        console.log(com);

        setComments((prev) => [...prev, com]);
        setNewComment("")


    }

    const ReplyComment = (parentId, replydata) => {

        const reply = {
            id: new Date().getTime(),
            content: replydata,
            score: 0,
            replies: []

        }

        const updatedCom = comments.map((el) => {
            if (el.id === parentId) {
                return {
                    ...el,
                    replies: [...el.replies, reply]
                }
            }
            return el;
        });
        setComments(updatedCom);

    }

    const VoteComment = (comId, vote) => {
        const updatedCom = comments.map((el) => {
            if (el.id === comId) {
                let newScore = el.score;
                if (vote === "upvote") {
                    newScore += 1;
                }
                else if (vote === "downvote") {
                    newScore -= 1
                }
                return {
                    ...el,
                    score: newScore
                };
            }
            else if (el.replies && el.replies.length > 0) {
                const updatedReplies = el.replies.map((reply) => {
                    if (reply.id === comId) {
                        let newScore = reply.score;
                        if (vote === "upvote") {
                            newScore += 1;
                        }
                        else if (vote === "downvote") {
                            newScore -= 1
                        }
                        return {
                            ...reply,
                            score: newScore
                        }
                    }

                    return reply

                });


                return {
                    ...el,
                    replies: updatedReplies
                }
            }
            return el;
        })
        setComments(updatedCom)

    }

    const SortComment = (option) => {
        let sortedComment = [...comments]
        if (option === "oldest") {
            sortedComment.sort((a, b) => a.id - b.id);
        }
        else if (option === "newest") {
            sortedComment.sort((a, b) => b.id - a.id);
        }
        else if (option === "leastscore") {
            sortedComment.sort((a, b) => a.score - b.score);
        }
        else if (option === "mostscore") {
            sortedComment.sort((a, b) => b.score - a.score);
        }

        setComments(sortedComment)
        setSorts(option)
    }


    return (
        <>
            <div className={style.inputbox}>
                <textarea className={style.input} placeholder='Enter your comment' value={newComment} onChange={(e) => { setNewComment(e.target.value); }} />
                <button className={style.inputbutton} onClick={AddComment}>Comment</button>
            </div>
            <div className={style.sortingbox}>
                <select value={sorts} className={style.sorting} onChange={(e) => SortComment(e.target.value)}>
                    <option value="oldest">Oldest </option>
                    <option value="newest">Newest</option>
                    <option value="mostscore">Most Score</option>
                    <option value="leastscore">Least Score</option>
                </select>
            </div >
            <div>

                {
                    comments?.map((el) => {
                        return <Comment key={el.id} comment={el} AddReply={ReplyComment} AddVote={VoteComment} />
                    })
                }
            </div>

        </>
    )
}

export default CommentSection