var clipboard = []                // To store files to clipboard to copy or move them 
var pre = "user@root"            // Beginning of each terminal line
var current_path = "/"            // Current location of user     
var pointer = -1                   // pointer points to the index of the current directory
                                   //pointer = -1 corresponds to root directory
var file_dir = []                 // List of files and directories
var commands = ["create","vi","rm","truncate","ls","rename","properties","command_list"]

/*
create : For creating a file
mkdir : Creating a directory
rmdir : Deleting a directory
vi : Open a file
rm : Delete a file
cd : Go to a directory
truncate : Delete contents of a file
ls : List contents of a directory
rename : Rename a file
properties : Display properties of file
commands : Display all commands
*/
var textbox
var contents
var divide
var lslabel
var index


start()

function start()
{
 var div = document.getElementById('divx')
 var label = document.createTextNode(pre + current_path)
 var br = document.createElement("br")
 textbox = document.createElement('input')
 textbox.setAttribute("class","textbox")
 textbox.setAttribute("type","text")
 textbox.setAttribute("onkeydown","nextline(event,textbox.value)")
 div.appendChild(label)
 div.appendChild(textbox)
 div.appendChild(br)
 textbox.focus()
}


function nextline(event,text)
{
 var x = event.keyCode;
 if(x == 13)
 {
  divide = text.split(" ")
  user_com = divide[0]
  for(i=0;i<commands.length;i++)
  {
   if(user_com == commands[i])
   {
    break
   }
  }
  if(i < commands.length)
  {
   switch(i)
   {
    case 0:create(divide[1])
	   break    
    case 1:vi(divide[1])
    	   break	
    case 2:rm(divide[1])
    	   break
    case 3:truncate(divide[1])
    	   break 
    case 4:ls()
    	   break 
    case 5:rename(divide[1],divide[2])
    	    break
    case 6:properties(divide[1])
	    break
    case 7:command_list()
    	    break
   }
  }
 }
}

/*
Form in which entries are entered in file_dir :
Each entry is a list
1. Name of file : string
2. File/directory : Binary value - 0 for file, 1 for directory
3. Address of previous directory : Index of previous directory
4. Size : Length of content of file - String format
5. Protection : User, Group, Other
6. Location : Location of file
7. Content : String 
*/

function create(file)          // Working
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer)           // Second condition verifies whether elements of current directory are checked 
  {								    // or not	
   alert("File already exists")
   start()
   return
  }
 }
 file_dir.push([file,0,pointer,0,666,current_path,""])
 start()
}


function ls()                // Working
{
 var div = document.getElementById('divx')
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][2] == pointer)
  {
   var label = document.createTextNode(String(file_dir[i][0]) + " ")
   div.appendChild(label)   
  }
 } 
 var br = document.createElement("br")
 div.appendChild(br) 
 start()
}

function rm(file)            // Working    
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)           
  {								    			 
   file_dir.splice(i,1)
   start()
   return
  }
 }
 div = document.getElementById('divx')
 var label = document.createTextNode("File not found")
 var br = document.createElement("br")
 div.appendChild(label)
 div.appendChild(br)
 start()
}

function vi(file)                                       // Working
{
 div = document.getElementById('divx')
 var flag = 0
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)           
  {		
   flag = 1                                              // File is found
   var br = document.createElement("br")
   var br1 = document.createElement("br")
   var prompt = document.createTextNode("Press Ctrl to Save and Exit")					    			 	
   contents = document.createElement('TextArea')
   contents.setAttribute("rows","15")
   contents.setAttribute("cols","120")
   index = i
   contents.setAttribute("onkeydown","savefile(event,contents.value,index,contents)")
   contents.value = file_dir[i][6]                      // Contents of file are copied to the textbox
   div.appendChild(prompt)
   div.appendChild(br)
   div.appendChild(contents)
   div.appendChild(br1)   
   contents.focus()
  }
 }
 if(flag == 0)
 {
  var label = document.createTextNode("File not found")
  var br = document.createElement("br")
  div.appendChild(label)
  div.appendChild(br)
  start()
 }
}

function savefile(event,text,index,contents)                   // Save contents of file    // Working
{
 var x = event.keyCode
 if(x == 17)
 {
  file_dir[index][6] = text
  file_dir[index][3] = String(text.length)
  alert("File saved")
  contents.setAttribute("disabled",true)
  start()
 }
} 

function truncate(file)
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)           
  {								    			 
   file_dir[i][6] = ""
   file_dir[i][3] = "0"
   start()
   return
  }
 }
 div = document.getElementById('divx')
 var label = document.createTextNode("File not found")
 var br = document.createElement("br")
 div.appendChild(label)
 div.appendChild(br)
 start()
}

function rename(file,name)
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)           
  {								    			 
   file_dir[i][0] = name
   start()
   return
  }
 }
 div = document.getElementById('divx')
 var label = document.createTextNode("File not found")
 var br = document.createElement("br")
 div.appendChild(label)
 div.appendChild(br)
 start()
}

function properties(file)                      // Working
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)       // For files    
  {	
   var div = document.getElementById('divx')
   var l1 = document.createTextNode("Name : " + file_dir[i][0])
   var br1 = document.createElement("br")   
   var l2 = document.createTextNode("Type : text")
   var br2 = document.createElement("br")
   var l3 = document.createTextNode("Size : " + file_dir[i][3])
   var br3 = document.createElement("br")
   var l4 = document.createTextNode("Location : " + file_dir[i][5])
   var br4 = document.createElement("br")
   div.appendChild(l1)
   div.appendChild(br1)
   div.appendChild(l2)
   div.appendChild(br2)
   div.appendChild(l3)
   div.appendChild(br3)
   div.appendChild(l4)
   div.appendChild(br4)
   start()
   return
  }
 }
 div = document.getElementById('divx')
 var label = document.createTextNode("File not found")
 var br = document.createElement("br")
 div.appendChild(label)
 div.appendChild(br)
 start()
}

function command_list()
{
 var div = document.getElementById("divx")
 var l1 = document.createTextNode("create	")
 var l2 = document.createTextNode("vi	")
 var l3 = document.createTextNode("rm	")
 var l4 = document.createTextNode("truncate	")
 var l5 = document.createTextNode("ls	")
 var l6 = document.createTextNode("rename	")
 var l7 = document.createTextNode("properties")
 var br = document.createElement("br")
 var br1 = document.createElement("br")
 var br2 =document.createElement("br")
 var br3 =document.createElement("br")
 var br4 =document.createElement("br")
 var br5 =document.createElement("br")
 var br6 =document.createElement("br")
 var br7 =document.createElement("br")
 div.appendChild(l1)
 div.appendChild(br7)
 div.appendChild(l2)
 div.appendChild(br1)
 div.appendChild(l3)
 div.appendChild(br2)
 div.appendChild(l4)
 div.appendChild(br3)
 div.appendChild(l5)
 div.appendChild(br4)
 div.appendChild(l6)
 div.appendChild(br5)
 div.appendChild(l7)
 div.appendChild(br6)
 start()
}
