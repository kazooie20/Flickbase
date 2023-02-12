import React, {useEffect} from 'react'

//MUI
import Grid from '@mui/material/Grid'; 
import Button from '@mui/material/Button';

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import { homeLoadMore } from '../../store/actions/articles'

import ArticleCard from '../../utils/articleCard';

const Home = () => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  const getNextArticles = () => {
    let skip = articles.homeSort.skip + articles.homeSort.limit;
    dispatch(homeLoadMore({...articles.homeSort, skip: skip}))
  }

  useEffect(() => {
    //PREVENTS ADDITIONAL LOADING OF ARTICLES 
    if (articles.articles.length <= 0) {
      dispatch(homeLoadMore(articles.homeSort));
    }
  }, [dispatch])
  
  return (
    <div>
      <Grid container spacing={2} className='article_card'>
        {
          articles && articles.articles ? 
          
            articles.articles.map((item)=> {
              <Grid key={item._id} item xs={12} sm={6} lg={3}>
                <ArticleCard article={item}/>
              </Grid>
            })
          
          :null
        }

      </Grid>
      <hr />
      <Button variant='outlined' onClick={getNextArticles}>Load More</Button>
    </div>
  )
}

export default Home