import React, {useState} from "react";


function Comments(props){
    const [comment, setComment] = useState({
        comments : ''
        });

        function handleChange(e){
            const {name, value}= e.target;

            setComment((prevValue)=>{
                return{
                    ...prevValue, 
                    [name] : value
                }
            });
        }
        function handleSubmit(e){
            e.preventDefault();
            props.addComment(comment);       
            setComment({
                comments: ''
            });    
        }
    return <div>
        <textarea
        rows='2'
        cols=''
        name='comments'
        value={comment.comments}
        placeholder='Write a comment'
        onChange={handleChange}/>
        <button onClick={handleSubmit}>Add Comment</button>
    </div>
}

export default Comments;