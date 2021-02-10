
import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  
  render() {
    const nickname = this.props.nickname;
    const avatar = this.props.avatar;
    const caption = this.props.caption;
    const followlink = this.props.followlink;

    return (
      <article className="Post" ref="Post">
        <img src={avatar} alt={nickname} className="Post-user-avatar" />
        <span className="Post-user-nickname">{nickname}</span>
        {caption}
        <a target="_blank" rel="noopener noreferrer" href={followlink} className="Post-follow-link" ><img border="0" alt="FollowUser" src="https://i.pinimg.com/originals/a4/a3/1a/a4a31ada1473bb2bf2f05cbb43698dcb.png" width="100px" height="45px"></img></a>
      </article>
    );
    
  }
}
export default Post;

