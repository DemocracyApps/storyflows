# StoryFlows
This is the documentation for StoryFlows.

## Basic Concepts

When we wish to convey information to some sort of audience, a common approach is to present it as a logical sequence of discrete chunks of information, typically some text and images, as in a traditional slide presentation. Done well, the sequence is organized to tell a story in a way that engages the audience and helps them to make sense of the overall message or topic. Such a sequential set of information blocks is the simplest sort of storyline.

However, when the audience consists of a single user and that person can interact with the presentation, we may wish to modify the sequence based on what she tells us. This allows us to throw out irrelevant parts of the presentation and tailor the story we are telling to this particular person. In this case the particular story flow is generated from a larger structure with branches based on information the user provides or choices the user makes.

Creating and presenting such interactive story flows is the purpose of StoryFlows.

The StoryFlows system is composed of several simple pieces:

* [Cards & Cardsets](cards.md) - The StoryFlow content structure
* Card Provider - A source from which we can fetch card data
* [Flow](flow.md) - The StoryFlow structure, which refers to cards
* Card Editor - The card authoring component
* [Flow Editor](floweditor.md) - The flow authoring component
* [Presenter](presenter.md) - The component that displays a story and interacts with a user

A key part of the philosophy of StoryFlows is that each of these components interacts with the others through a well-defined API so that third-party components may be easily swapped for the native ones. Where appropriate, these components are also designed to be easily extensible.

### StoryFlows Content: Cards


* [Cards](cards.md)
