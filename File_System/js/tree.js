var pre = "root@"            // Beginning of each terminal line
var current_path = ""            // Current location of user
var pointer = -1                   // pointer points to the index of the current directory
                                   //pointer = -1 corresponds to root directory
var file_dir = []                 // List of files and directories
var commands = ["create","vi","rm","truncate","ls","rename","properties","command_list","signout","mkdir","rmdir","cd"]   //List of predefined commands
var passwords = ['abc','def','ghi','jkl']           // Passwords of all users
/*
------------COMMANDS AVAILABLE-------------
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
*/
var textbox
var contents
var divide
var lslabel
var index
var ufd                       // Contains the index of the current user file directory
var userin

userdir('user_1')
userdir('user_2')
userdir('user_3')
userdir('user_4')


signup()   //Intializing the terminal UI

//Function to initialize the terminal UI and log in
function signup()
{
 var div = document.getElementById('divx')
 var choice = -1
 var pointer = -1
 var br1 = document.createElement("br")
 var br2 = document.createElement("br")
 var br3 = document.createElement("br")
 var br4 = document.createElement("br")
 var br5 = document.createElement("br")
 var br6 = document.createElement("br")
 var label1 = document.createTextNode('User Signup')
 var label2 = document.createTextNode('1. User 1')
 var label3 = document.createTextNode('2. User 2')
 var label4 = document.createTextNode('3. User 3')
 var label5 = document.createTextNode('4. User 4')
 var label6 = document.createTextNode('Enter user number and password ')
 userin = document.createElement('input')
 userin.setAttribute("class","textbox")
 userin.setAttribute("type","text")
 userin.setAttribute("onkeydown","signupresponse(event,userin.value)")      //Detect every key pressed from terminal and send to signupresponse() function
 div.appendChild(label1)
 div.appendChild(br1)
 div.appendChild(label2)
 div.appendChild(br2)
 div.appendChild(label3)
 div.appendChild(br3)
 div.appendChild(label4)
 div.appendChild(br4)
 div.appendChild(label5)
 div.appendChild(br5)
 div.appendChild(label6)
 div.appendChild(userin)
 div.appendChild(br6)
 userin.focus()
}

//Function to sign in respective user from terminal
function signupresponse(event,userinput)
{
 var x = event.keyCode
 if(x == 13)                      // On ENTER key press (Keycode of ENTER is 13)
 {
	 var userin_split = userinput.split(" ")        //Tokenize command
	 switch(userin_split[0])    //Checking password for respective users
	 {
	  case '1':if(userin_split[1] == passwords[0])
	  	 {
	  	  current_path = 'user_1/'
	  	  ufd = 0
	  	  pointer = 0
	  	  start()
	  	 }
	  	 break
	  case '2':if(userin_split[1] == passwords[1])
	  	 {
	  	  current_path = 'user_2/'
	  	  ufd = 1
	  	  pointer = 1
	  	  start()
	  	 }
	  	 break
	  case '3':if(userin_split[1] == passwords[2])
	  	 {
	  	  current_path = 'user_3/'
	  	  ufd = 2
	  	  pointer = 2
	  	  start()
	  	 }
	  	 break
	  case '4':if(userin_split[1] == passwords[3])
	  	 {
	  	  current_path = 'user_4/'
	  	  ufd = 3
	  	  pointer = 3
	  	  start()
	  	 }
	  	 break
	  default:signup()
	 }
 }
}

//Function to signout as user
function signout()
{
 signup()   //Returning to sign in state
}

//Function to run the terminal UI after signing in
function start()
{
 var div = document.getElementById('divx')
 var label = document.createTextNode(pre + current_path)
 var br = document.createElement("br")
 textbox = document.createElement('input')
 textbox.setAttribute("class","textbox")
 textbox.setAttribute("type","text")
 textbox.setAttribute("onkeydown","nextline(event,textbox.value)")      //Detect every key pressed from terminal and send to nextline() function
 div.appendChild(label)
 div.appendChild(textbox)
 div.appendChild(br)
 textbox.focus()
}

//Function to run the commands from terminal UI
function nextline(event,text)
{
 var x = event.keyCode;
 if(x == 13)                      // On ENTER key press (Keycode of ENTER is 13)
 {
  divide = text.split(" ")        //Tokenize the command
  user_com = divide[0]
  for(i=0;i<commands.length;i++)    //Detecting the command (Which command it is)
  {
   if(user_com == commands[i])
   {
    break
   }
  }
  if(i < commands.length)         //Checking if command is predefined ie., is among the predefined list
  {
   switch(i)                      //Running the command
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
    case 8:signout(divide[1])
            break
    case 9:mkdir(divide[1])
    	    break
    case 10:rmdir(divide[1])
            break
    case 11:cd(divide[1])
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
4. Size : Length of content of file
5. Protection : User, Group, Other
6. Location : Location of file
7. Content : String
*/

//Function to create a text file. Syntax: create <filename>
function create(file)
{
 for(i=0;i<file_dir.length;i++)                                     //Traversing through all files to check if filename already exists
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer)           // Second condition verifies whether elements of current directory are checked
  {								    // or not
   alert("File already exists")
   start()
   return
  }
 }
 file_dir.push([file,0,pointer,0,666,current_path,""])       //Creating empty file
 start()
}

//Function to create a new folder/directory in the current directory for different users
function userdir(dir)
{
 file_dir.push([dir,1,pointer,0,666,current_path,""])       //Creating empty directory
}

//Function to list all content in the directory ie., system
function ls()
{
 var div = document.getElementById('divx')
 for(i=0;i<file_dir.length;i++)          //Getting names of all files present
 {
  if(file_dir[i][2] == pointer)
  {
   var label = document.createTextNode(String(file_dir[i][0]) + " ")   //Getting filename
   div.appendChild(label)
  }
 }
 var br = document.createElement("br")
 div.appendChild(br)
 start()
}

//Function to delete a file. Syntax: rm <filename>
function rm(file)
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)  //3rd Check is to confirm this is a file, not a folder
  {
   file_dir.splice(i,1)     //Removing file
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

//Function to edit a text file. Syntax: vi <filename>
function vi(file)
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
   contents = document.createElement('TextArea')         // Create/display textbox to edit/add content to the file
   contents.setAttribute("rows","15")
   contents.setAttribute("cols","120")
   index = i
   contents.setAttribute("onkeydown","savefile(event,contents.value,index,contents)") //Add attribute to DOM to send data on each key press
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

//Function to save contents of a file
function savefile(event,text,index,contents)
{
 var x = event.keyCode
 if(x == 17)    //Check if CTRL key is pressed
 {
  file_dir[index][6] = text
  file_dir[index][3] = String(text.length)
  alert("File saved")
  contents.setAttribute("disabled",true)    //Disable textbox
  start()
 }
}

//Function to truncate a file. Syntax: truncate <filename>
function truncate(file)
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)
  {
   file_dir[i][6] = ""  //Set content empty
   file_dir[i][3] = "0" //Set file size to 0
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

//Function to display file properties. Syntax: properties <filename>
function properties(file)
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 0)    //  For files
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
  if(file_dir[i][0] == file && file_dir[i][2] == pointer && file_dir[i][1] == 1)       // For directories
  {
   var div = document.getElementById('divx')
   var l1 = document.createTextNode("Name : " + file_dir[i][0])
   var br1 = document.createElement("br")
   var l2 = document.createTextNode("Type : directory")
   var br2 = document.createElement("br")
   var l4 = document.createTextNode("Location : " + file_dir[i][5])
   var br4 = document.createElement("br")
   div.appendChild(l1)
   div.appendChild(br1)
   div.appendChild(l2)
   div.appendChild(br2)
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

//Function to display available commands list
function command_list()
{
 var div = document.getElementById("divx")
 var l1 = document.createTextNode("create	")
 var l2 = document.createTextNode("vi	")
 var l3 = document.createTextNode("rm	")
 var l4 = document.createTextNode("truncate	")
 var l5 = document.createTextNode("ls	")
 var l6 = document.createTextNode("rename	")
 var l7 = document.createTextNode("mkdir")
 var l8 = document.createTextNode("rmdir")
 var l9 = document.createTextNode("cd")
 var l10 = document.createTextNode("properties")
 var br = document.createElement("br")
 var br1 = document.createElement("br")
 var br2 =document.createElement("br")
 var br3 =document.createElement("br")
 var br4 =document.createElement("br")
 var br5 =document.createElement("br")
 var br6 =document.createElement("br")
 var br7 =document.createElement("br")
 var br8 =document.createElement("br")
 var br9 =document.createElement("br")
 var br10 =document.createElement("br")
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
 div.appendChild(l8)
 div.appendChild(br8)
 div.appendChild(l9)
 div.appendChild(br9)
 div.appendChild(l10)
 div.appendChild(br10)
 start()
}

//Function to create a new directory. Syntax: mkdir <dirname>
function mkdir(dir)
{
 for(i=0;i<file_dir.length;i++)     // Check if dirname already exists in current directory
 {
  if(file_dir[i][0] == dir && file_dir[i][2] == pointer)           // Second condition verifies whether elements of current directory are checked
  {								    // or not
   alert("Directory already exists")
   start()
   return
  }
 }
 file_dir.push([dir,1,pointer,0,666,current_path,""])
 start()
}

//Function to delete a directory. Syntax: rmdir <dirname>
function rmdir(dir)
{
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == dir && file_dir[i][2] == pointer && file_dir[i][1] == 1)       // Finding the directory
  {
   file_dir.splice(i,1)
   start()
   return
  }
 }
 div = document.getElementById('divx')
 var label = document.createTextNode("Directory not found")
 var br = document.createElement("br")
 div.appendChild(label)
 div.appendChild(br)
 start()
}

//Function to change the current directory
function cd(dir)
{
 if(dir == '..')
 {
  pointer = ufd
  current_path = file_dir[ufd][0] + '/'             // Coming back to the user file directory
  start()
  return
 }
 for(i=0;i<file_dir.length;i++)
 {
  if(file_dir[i][0] == dir && file_dir[i][2] == pointer && file_dir[i][1] == 1)
  {
   pointer = i                                        // Change current directory - Change position of pointer
   current_path = current_path + dir + '/'
   start()
   return
  }
 }
 div = document.getElementById('divx')
 var label = document.createTextNode("Directory not found")
 var br = document.createElement("br")
 div.appendChild(label)
 div.appendChild(br)
 start()
}
