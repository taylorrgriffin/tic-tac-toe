### What paths are supported ### 

root:
`http://tictactoe.localtunnel.me` 

`/reportGame`   
method: post  
 ```
 var reportElem = {
  win: 'x' || 'o',
  path: 'top middle' 
 } 
 ```  

this endpoint is used to add new game report, it just append the json file to  
the list, so that we can see the complete results of each and every game.

soon to be 

`/fetchStats/:statsID`

fetch stats about certain traights of the database
