# StoryFlows
This is the design documentation for StoryFlows. For the time being it is a place to work through the design before writing initial versions of the various bits, so it will change often and may be ahead of or behind any actual code in this project.

At this point, the code part of the project is a skeleton of a React+Redux application that we'll use as the basis for building this out (it was just copied from the new [cbe-client](https://github.com/DemocracyApps/cbe-client)).

## Basic Concepts

When we wish to convey information to some sort of audience, a common approach is to present it as a logical sequence of discrete chunks of information, typically some text and images, as in a traditional slide presentation. Done well, the sequence is organized to tell a story in a way that engages the audience and helps them to make sense of the overall message or topic. Such a sequential set of information blocks is the simplest sort of story flow.

However, when the audience consists of a single user who can interact with the presentation, we may wish to modify the sequence based on what she tells us. We may skip irrelevant parts and tailor the story we tell to this particular person. In this case the story flow is generated from a larger structure that allows branching and jumping based on information the user provides or choices she makes.

Creating and presenting such interactive story flows is the purpose of StoryFlows.

The StoryFlows system is composed of several simple pieces: _cards_ that hold the content to be presented, a _flow_ structure that defines all the possible pathways through the content, a _presenter_ that actually delivers the content flow to a user, and _editors_ for authoring the content and flow structure. These pieces are loosely coupled through well-defined APIs so that individual pieces may be swapped out for alternative implementations. This eases long-term maintenance of the system, but also enables third-party wrappers and replacements for any part of the system.

* [Cards](cards.md) - The StoryFlow content
* [Flow](flow.md) - The StoryFlow structure, which refers to cards
* [Card Plugins](plugins.md) - Plugins that allow user interaction and dynamic content in cards
* [Card Editor](cardeditor.md) - The card authoring component
* [Flow Editor](floweditor.md) - The flow authoring component
* [Presenter](presenter.md) - The component that displays a story and interacts with a user

Note that this system can be used to create a variety of tools, from simple presentation software to screening decision-trees creators. Our goal at the beginning is to create a minimal system, but to have these broader potential applications in mind.

To this end, we may want to have in mind Abhi Nemani's requirements for presentation software in his recent <a href="https://medium.com/@abhinemani/we-deserve-better-presentation-software-a-pitch-1ec9e2a8a57#.ji4oxcfv8" target="_blank">Medium article</a>.

