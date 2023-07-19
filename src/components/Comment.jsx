import React from 'react'
import style from "./Comment.module.css"


export const Comment = ({ comment, AddReply, AddVote }) => {

    const { id, content, score, replies } = comment || {};

    const handleVote = (vote) => {
        AddVote(id, vote)
    }

    const handlReply = (parentId) => {
        const replyData = prompt("enter your comment");

        if (replyData) {
            AddReply(parentId, replyData);
        }
    }


    return (
        <>
            <div className={style.commentbox}>
                <div className={style.comment}>
                    <div>{comment.content}</div>

                    <div className={style.buttonbox}>
                        <span>Score:{score}</span>
                        <button className={style.buttons} onClick={() => { handleVote("upvote") }} >Upvote</button>
                        <button className={style.buttons} onClick={() => { handleVote("downvote") }}>Downvote</button>
                        <button className={style.buttons} onClick={() => handlReply(comment.id)}>Reply</button>
                    </div>
                </div>
                {
                    <div>
                        <div>
                            {
                                replies && (
                                    <div>
                                        {
                                            replies?.map((el) => {
                                                return <Comment key={el.id} comment={el} AddReply={AddReply} AddVote={AddVote} />
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>

                }

            </div>

        </>
    )
}


export default Comment;