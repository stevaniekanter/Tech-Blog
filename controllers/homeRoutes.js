const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all post 
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const posts = postData.map((postInfo) => postInfo.get({ plain: true }));
    console.log(posts)

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
      homeLink:'active',
      titleHead:'Tech Blog'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup',{
    loginLink:" active ",
    titleHead:'Tech Blog'
  });

});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return
  }

  res.render('login', {
    homeLink:'active',
    titleHead:'Tech Blog'
  });
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    const postInfo = dbPostData.get({ plain: true });

    const commentData = await Comment.findAll(
      { where: 
        { user_id: req.session.user_id,post_id:req.params.id } ,
        include:[{model: User}]
      }
      );
    const comments = commentData.map((comment) =>
      comment.get({ plain: true })
    );
    res.render('post', { 
      postInfo, 
      comments,
      loggedIn: req.session.loggedIn,
      homeLink:" active ",
      titleHead:'Tech Blog' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/new-post', withAuth, async (req, res) => {
  try {
    
    res.render('partials/add-post', { 
      loggedIn: req.session.loggedIn,
      dashboardLink:" active ",
      titleHead:'Your Dashboard' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    const postInfo = dbPostData.get({ plain: true });
    
    res.render('partials/edit-post', { 
      postInfo, 
      loggedIn: req.session.loggedIn,
      dashboardLink:" active ",
      titleHead:'Your Dashboard' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ where: { user_id: req.session.user_id } });
    const posts = postData.map((postInfo) =>
      postInfo.get({ plain: true })
    );
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      dashboardLink:" active ",
      titleHead:'Your Dashboard'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
