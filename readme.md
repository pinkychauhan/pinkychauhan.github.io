This narrative visualization demonstrates several temporally arranged scenes as a series of interactive web pages based on the world happiness scores data published by the United Nations Sustainable Development Solutions Network. The data is available as csv files for the years 2015 to 2019.
Data source: https://www.kaggle.com/unsdsn/world-happiness

Messaging:
•	The visualization demonstrates the ranking and ordering of countries in different regions of the world from 2015 to 2019 along with details of the factors contributing to the scores.
•	It depicts trends such as: What countries or regions rank the highest in overall happiness? How did country ranks or scores change between the 2015 and 2016 as well as the 2016 and 2017 reports? Which factors contribute highly to the scores? How are some of the factors progressing over the years?

Narrative Structure:
•	The visualization uses “interactive slideshow” as the narrative visualization structure.
•	Slideshow format enables author driven path in the form of slides starting with an overview followed by temporally sequenced scenes.
•	Each scene provides the user with opportunity to drill into some details.
•	There are 6 total slides. The first slide presents the overview and message regarding the inspiration for the visualization.
•	Slides 2 to 5 represent the scenes for each of the years from the year 2015 to 2019 and display some meaningful information about the happiness report data in the form of charts.
•	Each slide allows user to:
o	Navigate to the previous slide or the next slide,
o	Explore the scene for the current year and drill down further based upon the provided filters.
•	Slide show is a good choice to represent the data organized temporally and helps user see the changes with each year, compare the current year with the previous and the following year.

Visual Structure:

Structure:
•	Linear narrative structure is followed with consistent slide show layout with slides incrementally depicting the scene for the next year in order. This ensures user can understand how the trends vary over the years.
•	All scenes have navigation buttons on the top left and right to proceed to the previous and next year respectively. The buttons use highlight and magnification and change of cursor to pointer upon hovering to cue the user to navigate the scenes.
•	A modal window is also available on demand from the "Click for more details" button that explains the visualization elements as well as cues to effectively navigate or interact with the scenes.
•	Charts within each scene are coordinated by parameter changes and represent the flow from high level ranking overview to details of contributing factors from top to bottom.

Highlight:
•	There are annotations that depict the happiest countries in the bar chart. The annotation follows a consistent template using a highlighted bar representing the country with highest score in a region with an oblique text placed right above enlisting details such as region name, country name and rank.
•	Also, when the user filters to particular region only, the remaining bars and scatter plot points stay on the screen but in a low opacity state to relatively highlight the chart elements for the current selection compared to the rest of the data.
•	The relative coloring of the bars, scatter plot points highlights the proportion of counties in a certain range of happiness scores.

Transition:
•	When user navigates across the scenes, the charts transition over a second's time from previous state to new state changing the heights of the bars, coordinates of the plot circles, etc. to depict how the trends have changed in a more continuous manner. This keeps the user oriented through transitions. If a particular year's data has data for a country that didn't exist in the data for the scene user is coming from, then the chart elements transition from origin (zero) coordinates to their correct positions.


Scenes:
Each scene follows the same template for visual consistency and comprises of the following charts:
1) The bar chart on the top left shows the relative ordering/ranking based on happiness scores of over 150 countries for the particular year pertaining to the scene. This chart sets the basic high level picture regarding what we are viewing. Height of each bar, ordering and coloring of bars from green to red helps in distinguishing which countries ranked high, which ones didn't, what's the highest and lowest scores overall, etc.
A table to the top right lists the topmost happiest countries for the selected region or all regions along with their rank and score over the years.

2) The pie chart on the bottom left shows the aggregated distribution of the contributing factors involved in computing the happiness scores for the countries comprising the selected region. This helps user to see which factors are most important or major contributors to the happiness score of the countries.

3) The scatter chart on bottom center picks two of the contributing factors: health and social/family support and represents the relationship between them as a scatter plot. This chart can depict trends related to whether overall health and social support contribution has grown/reduced over the years. Which countries have the highest contributions to their scores from both these factors, etc.

Each scene presents a region filter at the bottom right to the user as a radio button option. The filter causes all the charts to update in a coordinated way based on the selection.

Scenes are ordered in increasing order of years which is a very efficient way to see the trends change overtime.

Annotations:
•	The bar chart is annotated with the highest-ranking country in each region for the particular year. The annotation follows a consistent template using a highlighted bar representing the country with highest score in a region with an oblique text placed right above enlisting details such as region name, country name and rank.
•	It helps in depicting trends such as: What countries or regions rank the highest in overall happiness? How did these vary across different years?
•	The annotation is updated as the users progresses through the slide show or drills down into the same scene. If user selects a particular region within the same scene, then annotation is also reinforced to annotate only the datapoints from current selection.


Parameters:
•	Year and region constitute the parameters.
•	Region is presented as a filter to the user to include only the datapoints from the current dataset that belong to the countries in the selected region. States can be All regions or only a specific region. Region controls the state in the same scene for all the charts that coordinate their display accordingly and is carried forward to the other scenes.
•	Year is used for moving from scene to scene and is used to look at a different dataset altogether that belongs to the year for the that scene. States can be years from 2015 to 2019. Years control the current state and state machine from slide to slide.

Triggers:
•	Clicking on navigation buttons presented on the top right and left side of screen respectively trigger a move to the next or previous scene by making a change to the year parameter. This is triggered using event callbacks.

•	Clicking on regions in the Regions filter section triggers change to filter the dataset in the current scene using event callbacks to only include datapoints from the selection. The filters are not reset with every scene to allow the user to focus on the current filtered selection and see its progression through the years.

Affordances:
•	A modal window is available on demand from the "Click for more details" button that explains the visualization elements as well as cues to effectively navigate or interact with the scenes.
•	The navigation and Click for details buttons use highlight and magnification and change of cursor to pointer upon hovering to cue the user.
•	Similarly, the region filter uses a radio button layout and also highlights the regions in green when user hovers over it and changes the cursor to pointer.
•	There are tooltips that provide additional information when hovering over the bars in the bar chart and points in the scatter plot. When hovering over the bar or scatter plot point, the selection is highlighted and magnified to make it more distinct compared to the rest.
