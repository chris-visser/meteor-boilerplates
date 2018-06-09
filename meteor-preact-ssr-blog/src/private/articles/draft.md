## I'm a problem solver
Present me with an idea or a problem to solve and I will help you.

I'm not emotionally attached to any of my code. Its just a tool for me to reach my goals. 
I do love software development though! It gives me unlimited freedom to build whatever I want. Time is my only enemy (and ofcourse people that try to slow me down.. hehe..)


I play football (soccer for people from America). It took me a while to figure out that I'm not the best 
striker. "Chris, your goal is to conquer the ball and pass it to people with the same shirt.". Sounds negative 
right? What I learned initially was that I suck at attacking. That made me sad, "what am I doing in our flagship then?"
well.. I turned out to have a great skill that strikers usually don't have, which is defending!

Ofcourse this works the other way around as well. I started accepting that our strikers are simply 
not good at defending. If they make a mistake during defence, its now easier for me to accept that that's 
not something that they should have been doing in the first place! Next time I will have his back a bit 
more.

Being open about your weaknesses and strengths is crucial. It makes you and people around you happy 
and willing to help eachother out. It makes you a better team player and a so much more lovable character!




One day I woke up and decided that it might be helpful for others to share 
how I always set up my Meteor and Node projects in a lean and easy, but 
still scalable way. My setup is quite opinionated, but it does follow standards 
and takes into account best practices used in many different types of projects 
and frameworks.


Here's what I did: I basically pretended that I was going to set up a project 
that might potentially become successful and that it might need to scale. 
But since time is a critical factor, I start small. This means that I work in 
very small 'deliverables' that take me a maximum of one day building time. 
After each deliverable I validate if this was the right thing to do and what 
my next priority is going to be. This practice is what I call 'Being agile'.







### Configure webstorm (Skip if using a different IDE / Editor)
Now we need to start Meteor. But lets leverage our IDE to handle this 
for us. 

#### Configure the start script

- Goto `Run` -> `Edit configurations`
- Click the plus sign
- Select NPM
- Now enter the project name (mine is just 'blog')
- On the line of package.json, click on the right 
side on the button (marked with 3 dots). Select 
the package.json in the src folder
- On the scripts line select 'start'
- Now click "apply" and "Ok" to close the window
- On the right top of the IDE press the green 'play' button
This should start Meteor for you and after startup it will 
be available on `http://localhost:3000`
- Open your browser to see if Meteor works as expected
- You should see a test app with a button

Note that this test app is based on Blaze. Meteor's initial and default 
templating language. We want to use React, but lets first prepare our IDE 
a bit before we switch template language

#### Configure language version
Now if you would open one of the javascript files you'll notice that there are a lot of errors given. This is because Webstorm's default configuration checks our code base on an old Javascript version. We need to configure the IDE to understand Ecmascript and JSX code.

- GOTO File -> Settings -> Languages & Frameworks -> Javascript
- Set Javascript language version to React JSX (es 6)





## Why Meteor?
It's time to start giving back to the community. Meteor has served me for years 
already and enridged many of my projects, customers and their customers with great value. 
Value that I would not be able to give with any other framework.

I'm a problem solver and problem solvers don't get personally attached 
with tools. Just with the way they function. For someone that solves its problems 
with software, time  is the number one factor. I simply can't focus on building and 
re-inventing something that someone else did much better.

### What makes Meteor great?
Shortly said plumbing... Ever dealt with Babel? Maybe Webpack? What about minification and concatenation? 
API's? Realtime connections? In memory database caching and synchroneous Javascript?
If not, chances are that you don't work with any web platform for at least 8 years...
 
If you did deal with some of the above stuff, you might have gone trough quite 
some learning curve! Not only that, chances are you might have become demotivated, frustrated and even outraged 
simply, because you felt that you were focussed on everything except the thing you tried to solve in the first place! 

The web has evolved. Its just not like how it used to be back in the days and that's exactly where Meteor fits in. 
Meteor solved all of the common problems for us and provides us a paved road in our journey to solve our problems using 
modern Javascript out of the box and for free!

### How I help the Meteor community
Showing off ofcourse! My experience + Meteor and its best practices all wrapped in a nice list of free and license free boilerplates and projects! 
(Open Source so to speak). Do with it whatever you want and feel free to bitch (constructively) to make the boilerplates and my articles even better!