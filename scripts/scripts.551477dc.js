!function(){var a=window.graphs||(window.graphs={});a.timeline=function(){function a(a){a.each(function(b){var c,f,g={top:10,right:12,bottom:30,left:12},i=d-g.left-g.right,j=e-g.top-g.bottom;a.select("svg").empty()?(c=a.append("svg").attr("width",i+g.left+g.right).attr("height",j+g.top+g.bottom).append("g").attr("transform","translate("+g.left+","+g.top+")"),f=c.append("g").attr("transform","translate(0,"+j+")").attr("class","x axis labelM")):(c=a.select("svg").attr("width",i+g.left+g.right).attr("height",j+g.top+g.bottom).select("g").attr("transform","translate("+g.left+","+g.top+")"),f=c.select("labelM"));var k=d3.scale.linear().range([j,0]),l=d3.scale.ordinal().rangeRoundBands([0,i],0),m=b.map(function(a){return a.century});b=b.sort(function(a,b){return d3.ascending(a.century,b.century)}),l.domain(m);var n=d3.max(b,function(a){return a.local+a.inter});k.domain([0,n]);var o=c.selectAll(".international").data(b);o.transition().duration(100).attr("x",function(a){return l(a.century)}).attr("width",l.rangeBand()/2).attr("y",function(a){return k(a.local+a.inter)}).attr("height",function(a){return j-k(a.local+a.inter)}),o.enter().append("rect").attr("class",function(a){return"international y"+a.century}).attr("x",function(a){return l(a.century)}).attr("width",l.rangeBand()/2).attr("y",j).attr("height",0).transition().duration(100).delay(function(a,b){return 30*b}).attr("y",function(a){return k(a.local+a.inter)}).attr("height",function(a){return j-k(a.local+a.inter)}),o.exit().remove();var p=c.selectAll(".local").data(b);p.transition().duration(100).attr("x",function(a){return l(a.century)}).attr("width",l.rangeBand()/2).attr("y",function(a){return k(a.local)}).attr("height",function(a){return j-k(a.local)}),p.enter().append("rect").attr("class",function(a){return"local y"+a.century}).attr("x",function(a){return l(a.century)}).attr("width",l.rangeBand()/2).attr("y",j).attr("height",0).transition().duration(100).delay(function(a,b){return 30*b}).attr("y",function(a){return k(a.local)}).attr("height",function(a){return j-k(a.local)}),p.exit().remove();var q=c.selectAll(".years-lgnd").data(b);q.enter().append("text").attr("class",function(a){return"years-lgnd y"+a.century}).attr("x",function(a){return l(a.century)+l.rangeBand()/4}).attr("y",j+20).attr("text-anchor","middle").text(function(a){return h[a.century]}),q.exit().remove()})}var b,c,d=200,e=120,f=!1,g=d3.dispatch("brushed"),h={1050:"12th c.",1150:"13th c.",1250:"14th c.",1350:"15th c.",1450:"16th c.",1550:"17th c.",1650:"18th c.",1750:"19th c.",1850:"20th c.",1950:"2oth + c."};return a.chartWidth=function(b){return arguments.length?(d=b,a):d},a.chartHeight=function(b){return arguments.length?(e=b,a):e},a.events=function(c){return arguments.length?(b=c,a):b},a.extent=function(b){return arguments.length?(c=b,a):c},a.fixed=function(b){return arguments.length?(f=b,a):f},d3.rebind(a,g,"on"),a}}(),angular.module("webappApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",resolve:{occupations:["fileService",function(a){return a.getFile("data/occupation_net_complete.json")}],places:["fileService",function(a){return a.getFile("data/places_net_complete.json")}],bars:["fileService",function(a){return a.getFile("data/time.json")}],top20:["fileService",function(a){return a.getFile("data/top_20_profiles.json")}]}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("webappApp").controller("MainCtrl",["$scope","occupations","places","bars","top20",function(a,b,c,d,e){a.occupations=b,a.top20=e,a.places=c,a.bars=d.bars,a.year=1050,a.vips=a.top20[a.year],a.filtplaces=[],a.filtocc=[],a.filtvip=[],a.bscale=d3.scale.sqrt().range([0,27]);var f=d3.max(a.vips,function(a){return a.foreign_locations+a.domestic_locations});a.bscale.domain([0,f]),a.$watch("year",function(b,c){if(b!=c){a.filtvip=[],a.vips=a.top20[b];var d=d3.max(a.vips,function(a){return a.foreign_locations+a.domestic_locations});a.bscale.domain([0,d])}}),a.getActive=function(b){return _.find(a.currNodes,function(a){return a.id==b}).active?1:.5},a.getNameById=function(b,c){return _.find(a.places[c].nodes,function(a){return a.id==b}).name},a.removeFilter=function(b,c){if("place"==c){var d=a.filtplaces.indexOf(b);a.filtplaces.splice(d,1)}},a.togglePerson=function(b){var c=a.filtvip.indexOf(b.toString());-1==c?a.filtvip.push(b.toString()):a.filtvip.splice(c,1),console.log(a.filtvip)}}]),angular.module("webappApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("webappApp").factory("fileService",["$q","$http",function(a,b){return{getFile:function(c){var d=a.defer();return b.get(c).success(function(a){d.resolve(a)}).error(function(){d.reject("An error occured while fetching file")}),d.promise}}}]),angular.module("webappApp").directive("brushablebars",["$location","$rootScope",function(a,b){return{restrict:"E",link:function(a,b,c){var d=d3.select(b[0]),e=parseInt(d.style("width").replace("px","")),f=graphs.timeline().chartWidth(e);d.datum(a.bars).call(f),d.selectAll(".international").on("click",function(b){a.year=b.century,a.$apply()}),d.selectAll("rect").style("opacity",.5),d.selectAll(".years-lgnd").style("opacity",0),d.selectAll(".y"+a.year).style("opacity",1),a.$watch("year",function(b,c){b!=c&&(d.selectAll("rect").style("opacity",.5),d.selectAll(".years-lgnd").style("opacity",0),d.selectAll(".y"+a.year).style("opacity",1))})}}}]),angular.module("webappApp").directive("network",function(){return{template:"<div></div>",restrict:"E",link:function(a,b,c){function d(){y.attr("transform","translate("+d3.event.translate+") scale("+d3.event.scale+")")}function e(a){var b=d3.geom.quadtree(x.nodes());return function(c){var d=c.r+p,e=c.x-d,f=c.x+d,g=c.y-d,h=c.y+d;b.visit(function(b,i,j,k,l){if(b.point&&b.point!==c){var m=c.x-b.point.x,n=c.y-b.point.y,o=m*m+n*n,p=d+b.point.r;p*p>o&&(o=((o=Math.sqrt(o))-p)/o*a,c.x-=m*=o,c.y-=n*=o,b.point.x+=m,b.point.y+=n)}return i>f||e>k||j>h||g>l})}}function f(a){u.attr("d",g),v.each(e(.5)),v.attr("transform",h),w.each(e(.5)),w.attr("transform",h)}function g(a){var b=a.target.x-a.source.x,c=a.target.y-a.source.y,d=Math.sqrt(b*b+c*c);return"M"+a.source.x+","+a.source.y+"A"+d+","+d+" 0 0,1 "+a.target.x+","+a.target.y}function h(a){return"translate("+a.x+","+a.y+")"}function i(){var b=d3.max(a.currNodes,function(a){return"person"==a.type?1:a.count});q.domain([0,b]),a.currNodes.forEach(function(a){a.r=q("person"==a.type?3:a.count),"Normandy"==a.name&&console.log(a.count)}),v=A.selectAll("circle").data(a.filterAllNodes(x.nodes()),function(a){return a.id}),v.enter().append("circle").attr("r",0).style("fill",function(a){return"person"==a.type?a.active?"#FCB13B":"#f9f9f9":a.active?"#BDCCD4":"#f9f9f9"}).style("opacity",function(a){return a.active?1:.9}).on("click",function(b){if("place"==b.type){var c=a.filtplaces.indexOf(b.id);c>-1?a.filtplaces.splice(c,1):a.filtplaces.push(b.id)}else if("person"==b.type){var c=a.filtvip.indexOf(b.id);c>-1?a.filtvip.splice(c,1):a.filtvip.push(b.id)}a.$apply()}),v.transition().duration(500).attr("r",function(a){return a.r}),v.exit().transition().duration(500).attr("r",0).remove(),u=z.selectAll("path").data(x.links(),function(a){return a.source.id+"-"+a.target.id}),u.enter().append("path").style("stroke",function(a){return a.source.active&&a.target.active?"#dceaf2":"#f9f9f9"}).style("opacity",function(a){return a.source.active&&a.target.active?1:0}),u.exit().transition().duration(500).style("opacity",0).remove(),w=B.selectAll("text").data(a.filterAllNodes(x.nodes()),function(a){return a.id}),w.exit().transition().duration(500).style("opacity",0).remove(),w.enter().append("text").text(function(a){return a.name}).attr("dy",".31em").attr("text-anchor","middle").style("fill",function(b){return!a.filtvip.length&&!a.filtocc.length&&!a.filtplaces.length&&b.r>15?"#444":1==b.active?"#444":"#ddd"}).on("click",function(b){if("place"==b.type){var c=a.filtplaces.indexOf(b.id);c>-1?a.filtplaces.splice(c,1):a.filtplaces.push(b.id)}else if("person"==b.type){var c=a.filtvip.indexOf(b.id);c>-1?a.filtvip.splice(c,1):a.filtvip.push(b.id)}a.$apply()}),w.style("font-size",function(a){return a.r/1.3}),x.size([s,t]).linkDistance(40).charge(-400).gravity(.5).friction(.8).on("tick",f).start()}a.currNodes=[],a.links=[];var j=function(b){a.currNodes.push(b)},k=function(b){for(var c=0,d=n(b);c<a.links.length;)a.links[c].source==d||a.links[c].target==d?a.links.splice(c,1):c++;a.currNodes.splice(o(b),1)},l=function(){a.links.splice(0,a.links.length)},m=function(b,c,d){var e=n(b),f=n(c);a.links.push({source:e,target:f,value:d})},n=function(b){for(var c in a.currNodes)if(a.currNodes[c].id===b)return a.currNodes[c]},o=function(b){for(var c=0;c<a.currNodes.length;c++)if(a.currNodes[c].id==b)return c};a.filterAllNodes=function(b){if(a.filtplaces.length||a.filtvip.length||a.filtocc.length){var c=[];b.forEach(function(b){b.active=!1,a.filtplaces.indexOf(b.id)>-1&&(b.active=!0,c.push(b.id)),a.filtvip.indexOf(b.id)>-1&&(b.active=!0,c.push(b.id)),a.filtocc.forEach(function(a){b.occupation.indexOf(a)>-1&&(b.active=!0,c.push(b.id))})}),a.links.forEach(function(a){c.indexOf(a.source.id)>-1&&(a.target.active=!0),c.indexOf(a.target.id)>-1&&(a.source.active=!0)})}else b.forEach(function(a){a.active=!0});return b};var p=5,q=d3.scale.sqrt().range([0,20]),r=d3.select(b[0]),s=parseInt(r.style("width").replace("px","")),t=parseInt(r.style("height").replace("px",""));r.select("svg").empty()&&r.append("svg").attr("width",s).attr("height",t);var u,v,w,x,y=r.select("svg").attr("preserveAspectRatio","xMidYMid meet").attr("pointer-events","all").call(d3.behavior.zoom().on("zoom",d)).append("g"),z=y.append("g").attr("class","paths"),A=y.append("g").attr("class","circles"),B=y.append("g").attr("class","texts");x=d3.layout.force().nodes(a.currNodes).links(a.links),a.places[a.year].nodes.forEach(function(a){j(a)}),a.places[a.year].edges.forEach(function(a){m(a.source,a.target,1)}),i(),a.$watch("year",function(b,c){if(b!=c){l(),a.newNodes=a.places[b].nodes,a.pastNodes=_.cloneDeep(a.currNodes);var d=_.differenceWith(a.pastNodes,a.newNodes,function(a,b){return a.id==b.id}),e=_.differenceWith(a.newNodes,a.pastNodes,function(a,b){return a.id==b.id}),f=_.intersectionWith(a.newNodes,a.pastNodes,function(a,b){return a.id==b.id});f.forEach(function(b){var c=_.find(a.currNodes,function(a){return b.id==a.id});c.count=b.count}),d.forEach(function(a){k(a.id)}),e.forEach(function(a){j(a)}),a.newLinks=a.places[b].edges,a.newLinks.forEach(function(a){m(a.source,a.target,1)}),i()}}),a.recolor=function(){v.style("fill",function(a){return"person"==a.type?a.active?"#FCB13B":"#f9f9f9":a.active?"#BDCCD4":"#f9f9f9"}).style("opacity",function(a){return a.active?1:.9}),u.style("stroke",function(a){return a.source.active&&a.target.active?"#dceaf2":"#f9f9f9"}).style("opacity",function(a){return a.source.active&&a.target.active?1:0}),w.style("fill",function(b){return!a.filtvip.length&&!a.filtocc.length&&!a.filtplaces.length&&b.r>15?"#444":1==b.active?"#444":"#ddd"})},a.$watch("filtplaces.length",function(b,c){b!=c&&(console.log(b),a.filterAllNodes(x.nodes()),a.recolor())}),a.$watch("filtvip.length",function(b,c){b!=c&&(console.log(b),a.filterAllNodes(x.nodes()),a.recolor())}),a.$watch("filtocc.length",function(b,c){b!=c&&(a.filterAllNodes(x.nodes()),a.recolor())})}}});