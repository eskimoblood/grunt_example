function doubleIt(t){return 2*t}function sum(t,e){return t+e}this.JST=this.JST||{},this.JST["dev/templates/template1.hbs"]=function(t,e,s){s=s||t.helpers;var n,r,a="",h="function",i=this.escapeExpression;return a+="<p>",r=s.attr,r?n=r.call(e,{hash:{}}):(n=e.attr,n=typeof n===h?n():n),a+=i(n)+"</p>\n"},this.JST["dev/templates/template2.hbs"]=function(t,e,s){s=s||t.helpers;var n,r,a="",h="function",i=this.escapeExpression;return a+="<h2>",r=s.attr,r?n=r.call(e,{hash:{}}):(n=e.attr,n=typeof n===h?n():n),a+=i(n)+"</h2>\n"};