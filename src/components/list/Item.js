import React from 'react';
import styles from './Item.css';

const Comments = ({entity: {descendants, id}}) => (
  <a href={`/item/${id}`} class={styles.commentCount}>{descendants > 1 ? `${descendants} comments` : 'discuss'}</a>
)

const Item = ({index, entity}) => {
  if (!entity) return null;
  
  const {url, title, score, by} = entity;
  return (
    <article className={styles.article}>
      <span className={styles.index}>{index}</span>
      <div className={styles.metadata}>
        <h2><a href={url} className={styles.outboundLink}>{title}</a></h2>
        <p>{score} points by <a href={`/user/${by}`} className={styles.link}>{by}</a> 1 month ago<Comments entity={entity} /></p>
      </div>
    </article>
  );
}

export default Item;