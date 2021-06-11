![](https://img.shields.io/badge/Plug--in_Type-Dynamic%20Action-orange.svg) ![](https://img.shields.io/badge/APEX-19.2-success.svg) ![](https://img.shields.io/badge/APEX-20.1-success.svg) ![](https://img.shields.io/badge/APEX-20.2-success.svg)

# Accordian Report


<img src="https://raw.githubusercontent.com/ashishtheapexian/accordian/master/preview.gif">

# Configurations

```JSON
{ "showIcon":"fa-plus-square fa-2x","hideIcon":"fa-minus-square fa-2x","headingBackground":"red","descBackground":"blue"}
```

<b>showIcon :</b> Icon class when collapsed </br>
<b>hideIcon :</b> Icon class when uncollapsed</br>
<b>headingBackground:</b> Background color for headings</br>
<b>descBackground:</b> Background color for description </br>

# Attributes
#TITLE# <br>
#TEXT#

<h4>Sample query</h4>
<code>
Select initcap(ename) TITLE, Empno|| '<br>' || 
'This example simply sets a class attribute to the details and let''s an external stylesheet toggle the collapsed state.
Hello Sir
This example simply sets a class attribute to the details and let''s an external stylesheet toggle the collapsed state.
I''m sliding' TEXT from emp;
</code>

<a href ="https://apex.oracle.com/pls/apex/f?p=93690:5:710168450726746:::::" target="_blank"> <h4>Demo</h4></a>
<a href ="https://blogs.ontoorsolutions.com/post/accordian-report-plugin/">Blog</a>
