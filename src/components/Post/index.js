// src/components/Post/index.js
import React, { Component } from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
import "./Post.css";

//  const Post = () => {
//     return (
//       <Query
//         query={gql`
//           {
//             post(user_id: "a", post_id: "a") {
//               image
//               caption
//               user {
//                 nickname
//                 avatar
//               }
//             }
//           }
//         `}
//       >
//     {({ loading, error, data }) => {
//           if (loading) return <p>Loading Post...</p>;
//           if (error) return <p>Error loading Post:(</p>;
//           let image = data.post.image;
//           let caption = data.post.caption;
//           let user = data.post.user;
//           return (
//             <article className="Post" ref="Post">
//               <header>
//                 <div className="Post-user">
//                   <div className="Post-user-avatar">
//                     <img src={user.avatar} alt={user.nickname} />
//                   </div>
//                   <div className="Post-user-nickname">
//                     <span>{user.nickname}</span>
//                   </div>
//                 </div>
//               </header>
//               <div className="Post-image">
//                 <div className="Post-image-bg">
//                   <img alt={caption} src={image} />
//                 </div>
//               </div>
//               <div className="Post-caption">
//                 <strong>{user.nickname}</strong> {caption}
//               </div>
//             </article>
//           );
//         }}
//       </Query>
//     );
//   };

//   export default Post;

class Post extends Component {
  
  render() {
    const nickname = this.props.nickname;
    const avatar = this.props.avatar;
    //const image = this.props.image;
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

