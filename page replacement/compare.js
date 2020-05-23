var res,pro;
		var resource;
		var noofframes;
		var flagFound=0,flag=0,flag2=0;
				var count=0,hit=0,miss=0;
				var pagefault;
				var pages=[];		
                var frames=[];
				var frameAge=[];
				var resource = [];
                var isLRU;
			function BuildFormFields($amount) // For Resorce allocation
			{
            res = $amount;
                if(res<0)
                	alert("Invalid Inputs");
				var
					$container = document.getElementById('FormFields'),
					$item, $field, $i;
				$container.innerHTML = '';
				for ($i = 0; $i < $amount; $i++) {
					$item = document.createElement('div');
					$item.style.margin = '10px';
				
                    $field = document.createElement('label');
                    $field.innerHTML = 'Page '+($i+1);
					$item.appendChild($field);
					$field = document.createElement('input');
					$field.name = 'Design[' + $i + ']';
					$field.type = 'text';
                    $field.setAttribute("class","form-control");
					$item.appendChild($field);
				$container.appendChild($item);

			
			
				}


            }

		function compare()
		{
			isLRU=0;
			MAIN();
	 FIFO1();	
		 RESULTS();
			isLRU=1;
			MAIN();
			LRU1();
		 RESULTS();
		 isLRU=2;
			MAIN();
			LRU1();
			RESULTS();
			isLRU=3;
			 MAIN();	
			OPR1();
			RESULTS();
			isLRU=4;
			MAIN();
		 MFU1();		
		 RESULTS();
		 
		 isLRU=5;
		 MAIN();
	 SECONDchance1();

		RESULTS();
		}
	
			function MAIN()
			{
				
				noofframes = document.getElementById('noofFrames').value;
				var res_form = document.resource;

				count=0,hit=0,miss=0;
						for(var i = 1;i <= res; i++)
						{
							resource[i-1] = Number(res_form[i].value);
							pages[i-1] = Number(res_form[i].value);         //added
						}

						//added
						

						for(var i=0;i<noofframes;i++)
						{  
						  frames[i]=-1;
						  frameAge[i]=-1;
						}

						//
						console.log(resource);
						var form = document.Need;
						var ned = [];
						var i,j;
						



						//TABLE for NEED
						var tab_need = document.getElementById("tab_need");
						var row = tab_need.insertRow(0);
						var cell = row.insertCell(0);
						if(isLRU==0)	cell.innerHTML = "<b>FIRST COME FIRST SERVE</b>";
						if(isLRU==1)	cell.innerHTML = "<b>LEAST RECENTLY USED</b>";
						if(isLRU==2)	cell.innerHTML = "<b>MOST RECENTLY USED</b>";
						if(isLRU==3)	cell.innerHTML = "<b>OPTIMAL PAGE REPLACEMENT</b>";
						if(isLRU==4)	cell.innerHTML = "<b>MOST FREQNTLY USED</b>";
						if(isLRU==5)	cell.innerHTML = "<b>Second Chance REPLACEMENT(CLOCK)</b>";
					
						
					
					}

					function RESULTS(){			
						var tab_alloc = document.getElementById("tab_need");
						var row = tab_alloc.insertRow(j+3);
						var cell = row.insertCell(0);
						cell.innerHTML ="Number of Page_Falts:"+miss;
						var cell = row.insertCell(0);
						cell.innerHTML ="Number of Page_Hits:"+hit;
						var cell = row.insertCell(0);
						cell.innerHTML ="Hit ratio:"+hit+"/"+res;

					   }
					   

			function LRU1(){		
						for(j=0;j<res;j++)      //no of pages
						{
							 flagFound=0,flag=0,flag2=0;
						     for( i=0;i<noofframes;i++)
									 {
										 if(frames[i]==pages[j])
											 {	
												 flagFound=1;
												 flag=1;
											     count++;
											     frameAge[i]=count; //age frame
											     hit++;
											     pagefault=1;  //	 printf("hit ");
											      break;
											} } 
							
									 if(flagFound==0)          //if frame not found and empty frame avalible
									 {
										   for(i=0;i<noofframes;i++)
										   {
												if(frames[i]==-1)
												{
												frames[i]=pages[j];
												flag=1;
												count++;
												frameAge[i]=count;
												pagefault=0;	//  printf("miss ");
												miss++;
												break;		
												}  }  }  //FLAG FOUND ends
							
									  if(flag==0)           //if frame not found
									  {
										min=frameAge[0];
									   var m=0;
                                                     // for lru
									   if(isLRU==1)
										{	for(i=0;i<noofframes;i++)
												{
													if(frameAge[i]<min)
													{
														min=frameAge[i];
														m=i;
													}  
													}
										}
										//   for mfu	
										if(isLRU==2)
										{	for(i=0;i<noofframes;i++)
											{
												if(frameAge[i]>min)
												{
													min=frameAge[i];
													m=i;
												}  
												}
									    }	

									   frames[m]=pages[j];
									   count++;
									   frameAge[m]=count;
									   miss++;
									   pagefault=0;    //	printf("miss ");   
									  }
							//printing results

											
						}  	
						var row = tab_need.insertRow(j+2);
						var cell = row.insertCell(0);
						if(isLRU==1)
						cell.innerHTML = "LRU RESULTS:";
						if(isLRU==2)
						cell.innerHTML = "MRU RESULTS:";                 
					}	
					
	//////////////////////////////////////////////////////////////////////////FIFO
	function FIFO1(){	
		        var page_f= 0;	
		for(j=0;j<res;j++)      //no of pages
		{
			 flagFound=0;
			 for( i=0;i<noofframes;i++)
					 {      
						 if(frames[i]==pages[j])
							 {	
								 flagFound=1;
							
								
								 hit++;
								 pagefault=1;  //	 printf("hit ");
								
								 page_f--;
								 
							} } 
							page_f++;
			
					 if((flagFound==0)&&(page_f<=noofframes))          //if frame not found and empty frame avalible
					 {
					 
						frames[j]=pages[j];
						pagefault=0;
						miss++;
					}  //FLAG FOUND ends
			
					 else if(flagFound==0)           //if frame not found
					  {
						frames[(page_f-1)%noofframes]=pages[j];
					   miss++;
					   pagefault=0;    //	printf("miss ");   
					  }
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "YES";
			else
			cell.innerHTML = "NO";							
		}  
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "RESULT:";
						  
	}		


	/////////////////////////////////////////////////////////////////////////////////////OPR
	function OPR1(){		
		for(j=0;j<res;j++)      //no of pages
		{
			 flagFound=0,flag=0,flag2=0;
			 var temp=[];
			 var k,max,pos,flag3=0;

			 for( i=0;i<noofframes;i++)
					 {
						 if(frames[i]==pages[j])
							 {	
								 flagFound=1;
								 flag=1;
								 count++;
								 frameAge[i]=count; //age frame
								 hit++;
								 pagefault=1;  //	 printf("hit ");
								  break;
							} } 
			
					 if(flagFound==0)          //if frame not found and empty frame avalible
					 {
						   for(i=0;i<noofframes;i++)
						   {
								if(frames[i]==-1)
								{
								frames[i]=pages[j];
								flag=1;
								count++;
								frameAge[i]=count;
								pagefault=0;	//  printf("miss ");
								miss++;
								break;		
								}  }  }  //FLAG FOUND ends
			
					  if(flag==0)           //if frame not found
					  {
						flag3 =0;
          
						for(i=0;i<noofframes;i++)
						{
						  temp[i] = -1;
						  
						  for(k =j+1;k<res;k++)         //checking in future
						  {
							if(frames[i] == pages[k])
							{
							  temp[i] = k;
							  break;
							}
						  }
						}

						for(i=0;i<noofframes;i++)         //if element not present
						{
						  if(temp[i] == -1)
						  {
							pos = i;
							flag3 = 1;
							break;
						  }
						}
						if(flag3 ==0)                     //if all elements prrresent
						{
						  max = temp[0];
						  pos = 0;
						  
						  for(i= 1;i<noofframes;i++)
						  {
							if(temp[i] > max)
							{
							  max = temp[i];
							  pos =i;
							}
						  }             
						}
					   frames[pos]=pages[j];
					   count++;
					   frameAge[pos]=count;
					   miss++;
					   pagefault=0;    //	printf("miss ");   
					  }
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "YES";
			else
			cell.innerHTML = "NO";							
		}  
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "RESULTS: ";
						  
	}		


	//////////////////////////////////////////////////////////////////////////////
	//MFU
	function MFU1(){
		var frameFREQ=[];
		for(j=0;j<noofframes;j++)
		      frameFREQ[j]=0;  
		for(j=0;j<res;j++)      //no of pages
		{     
			   var index;
			 flagFound=0,flag=0,flag2=0;
			 for( i=0;i<noofframes;i++)
					 {              
						 if(frames[i]==pages[j])
							 {	
								 flagFound=1;
								 flag=1;
								 count++;
								 frameAge[i]=count; //age frame
								 hit++;
								 index=i;
								 pagefault=1;  //	 printf("hit ");
								  break;
							} } 
			
					 if(flagFound==0)          //if frame not found and empty frame avalible
					 {
						   for(i=0;i<noofframes;i++)
						   {
								if(frames[i]==-1)
								{
								frames[i]=pages[j];
								flag=1;
								count++;
								frameAge[i]=count;
								pagefault=0;	//  printf("miss ");
								miss++;
								frameFREQ[i]=1;
								break;		
								}  } 

							if(flag==0)	
							{
							       var bestmfu=0;
								for(i=0;i<noofframes;i++)
								{
								 if(frameFREQ[i]>frameFREQ[bestmfu])
								    bestmfu=i;
								}
								frames[bestmfu]=pages[j];
								miss++;
								pagefault=0;  
								frameFREQ[bestmfu]=1;
							}
							
							
					}  //FLAG FOUND ends
					else
					{
                      frameFREQ[index]++;
					}
					  
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k]+"("+frameFREQ[k]+")";
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "YES";
			else
			cell.innerHTML = "NO";							
		}  
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "RESULT:";   //MFU mfu
						  
	}

	//////////////////////////////////////////////////////////////////////////////
	//SECONDchance
	function SECONDchance1(){
		var usedbit=[];
		var victimptr=0;
		for(j=0;j<noofframes;j++)
		      usedbit[j]=0;  
		for(j=0;j<res;j++)      //no of pages
		{     
			   var index;
			 flagFound=0,flag=0,flag2=0;
			 for( i=0;i<noofframes;i++)
					 {              
						 if(frames[i]==pages[j])
							 {
								 var hitindex=i;
								 if(usedbit[hitindex]==0)
								 usedbit[hitindex]=1;	
								 flagFound=1;
								 flag=1;
								
								 hit++;
								
								 pagefault=1;  //	 printf("hit ");
								
							} } 
			
					 if(flagFound==0)          //if frame not found and empty frame avalible
					 {    	miss++;
						pagefault=0; 

						if(usedbit[victimptr]==1)
            {
                do
                {
                    usedbit[victimptr]=0;
                    victimptr++;
                    if(victimptr==noofframes)
                        victimptr=0;
                }
                while(usedbit[victimptr]!=0);
            }
            if(usedbit[victimptr]==0)
            {
                frames[victimptr]=pages[j];
               // usedbit[victimptr]=1;
                victimptr++;
            }

							
							
							
					}  //FLAG FOUND ends

					if(victimptr==noofframes)
					victimptr=0;
					  
			//printing results

			var row = tab_need.insertRow(j+2);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>P"+(j+1)+"("+resource[j]+")"  + "</b>";		
			for(k=0;k<noofframes;k++)
			{
				var cell = 	row.insertCell(k+1);
				cell.innerHTML = frames[k];
			}
			var cell=row.insertCell(k+1);
			if(pagefault==0)
			cell.innerHTML = "YES";
			else
			cell.innerHTML = "NO";			
			
		
		}  
		var row = tab_need.insertRow(j+2);
		var cell = row.insertCell(0);
		cell.innerHTML = "RESULT:";   //MFU mfu
						  
	}