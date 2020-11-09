import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchPost, postSelector } from '../slices/post'
import { fetchComments, commentsSelector } from '../slices/comments'

import { Post } from '../components/Post'
import { Comment } from '../components/Comment'

const SinglePostPage = () => {

  const dispatch = useDispatch();
  const {
    match,
    post,
    comments,
    hasErrors,
    loading } = useSelector(postSelector, commentsSelector)

  useEffect(() => {
    const { id } = match.params

    dispatch(fetchComments(id))
    dispatch(fetchPost(id))
  }, [dispatch, match])

  const renderPost = () => {
    if (loading.post) return <p>Loading post...</p>
    if (hasErrors.post) return <p>Unable to display post.</p>

    return <Post post={post} />
  }

  const renderComments = () => {
    if (loading.comments) return <p>Loading comments...</p>
    if (hasErrors.comments) return <p>Unable to display comments.</p>

    return comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))
  }

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  )
}



export default SinglePostPage