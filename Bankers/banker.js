var res,pro;
        var resource;
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
                    $field.innerHTML = 'Resource '+$i;
					$item.appendChild($field);
					$field = document.createElement('input');
					$field.name = 'Design[' + $i + ']';
					$field.type = 'text';
                    $field.setAttribute("class","form-control");
					$item.appendChild($field);
					$container.appendChild($item);
				}
            }
            function BuildFormFields2($amount) //For Allocation
			{
				pro = $amount;
				if($amount<0)
                	alert("Invalid Inputs");
                console.log(res);
				var
					$container = document.getElementById('FormFields1'),
					$item, $field, $i;
				$container.innerHTML = '';
				for ($i = 0; $i < $amount; $i++) {
                    for($j = 0; $j < res; $j++)
                    {
                        $item = document.createElement('div');
                        $item.style.margin = '10px';
                        $field = document.createElement('label');
                        $field.innerHTML = 'Need for process '+$i+' Res: ' +$j;
					    $item.appendChild($field);
                        $field = document.createElement('input');
                        $field.name = 'Design[' + $i + ']';
                        $field.type = 'text';
                        $field.setAttribute("class","form-control");
                        $item.appendChild($field);
                        $container.appendChild($item);
                    }
				}
                BuildFormFields3($amount);
            }
			function BuildFormFields3($amount) //For Allocation
			{
				if($amount<0)
					alert("Invalid Inputs");
                console.log(res);
				var
					$container = document.getElementById('FormFields2'),
					$item, $field, $i;
				$container.innerHTML = '';
				for ($i = 0; $i < $amount; $i++) {
                    for($j = 0; $j < res; $j++)
                    {
                        $item = document.createElement('div');
                        $item.style.margin = '10px';
                        $field = document.createElement('label');
                        $field.innerHTML = 'Allocation for process '+$i+' Res: ' +$j;
                        $item.appendChild($field);
                        $field = document.createElement('input');
                        $field.name = 'Design[' + $i + ']';
                        $field.type = 'text';
                        $field.setAttribute("class","form-control");
                        $item.appendChild($field);
                        $container.appendChild($item);
                    }
				}
            }
            var y;
			function banker()
			{
						var res_form = document.resource;
						var resource = [];
						for(var i = 1;i <= res; i++)
						{
							resource[i-1] = Number(res_form[i].value);
						}
						console.log(resource);
						var form = document.Need;
						var ned = [];
						var i,j;
						console.log("PRO: "+pro+"RES: "+res);
						for(i = 1; i <= pro*res; i++)
							{
								ned[i-1] = Number(form[i].value);
							}
							var needy = [];
							for(var i = 0; i<pro;i++)
							{
								needy[i] = [];
								for(var j=0;j<res;j++)
								{
									needy[i][j] = ned[i*res+j];
								}
							}
							console.log(ned);
						console.log(needy);
						var alloc_form = document.Alloc;
						var alloc = [];
						for(var i = 0; i < pro; i++)
							{
								alloc[i] = [];
								for(var j = 0;j < res;j++)
								{
									alloc[i][j] = Number(alloc_form[i*res+j].value);
                                    console.log(alloc[i][j]);
								}
							}
						console.log(alloc);
						var avail = [];
						for(var i = 0; i < res; i++)
							avail[i] = resource[i];
						for(var i = 0; i < pro; i++)
						{
							for(var j = 0; j < res; j++)
							{
								avail[j] = avail[j] - alloc[i][j];
								needy[i][j] = needy[i][j] - alloc[i][j];
							}
						}
						console.log('avail: ' + avail);
						//TABLE for NEED
						var tab_need = document.getElementById("tab_need");
						var row = tab_need.insertRow(0);
						var cell = row.insertCell(0);
						cell.innerHTML = "<b>Need</b>";
                        var pro_head = tab_need.insertRow(1);
                        var cell = pro_head.insertCell(0);
                        cell.innerHTML = "<b>Process</b>";
                        for(i=1;i<=res;i++)
                        {
                            cell = pro_head.insertCell(i);
                            cell.innerHTML = "<b>Res "+(i-1)+"</b>";
                        }
						for(i=0;i<pro;i++)
						{
							var row = tab_need.insertRow(i+2);
                            var cell = row.insertCell(0);
                            cell.innerHTML = "<b>P"+i+"</b>";
							for(j=0;j<res;j++)
							{
								var cell = 	row.insertCell(j+1);
								cell.innerHTML = ned[res*i+j];
							}
						}
                        //TABLE for ALLOC
						var tab_alloc = document.getElementById("tab_alloc");
						var row = tab_alloc.insertRow(0);
						var cell = row.insertCell(0);
						cell.innerHTML = "<b>Allocation</b>";
                        var alloc_head = tab_alloc.insertRow(1);
                        var cell = alloc_head.insertCell(0);
                        cell.innerHTML = "<b>Process</b>";
                        for(i=1;i<=res;i++)
                        {
                            cell = alloc_head.insertCell(i);
                            cell.innerHTML = "<b>Res "+(i-1)+"</b>";
                        }
						for(i=0;i<pro;i++)
						{
							var row = tab_alloc.insertRow(i+2);
                            var cell = row.insertCell(0);
                            cell.innerHTML = "<b>P"+i+"</b>";
							for(j=0;j<res;j++)
							{
								var cell = 	row.insertCell(j+1);
								cell.innerHTML = alloc[i][j];
							}
						}
                        var prints = document.getElementById("printing");
						var i,j;
						var exec = 0; //Number of executed processes
						var ex = [0,0];
						for(var i = 0; i < pro; i++)
						{
							ex[i] = 0;
						}
                        var iter = 1;
						while(1)
						{
							var exec1 = exec // exec1 is compared with exec at the end of the while loop to check for deadlock
                            var li = document.createElement("li");
                            li.appendChild(document.createTextNode("Iteration "+ iter));
                            prints.appendChild(li);
                            var ul1 = document.createElement("ul");
							for (i = 0; i < pro; i++)
							{
								var flag = 0
								if(ex[i] == 0)
								{
                                    var li = document.createElement("li");
                                    li.appendChild(document.createTextNode("Process "+ i+": "));
                                    ul1.append(li);
                                    prints.appendChild(ul1);
                                    var ul2 = document.createElement("ul");
									for (var j = 0; j < res; j++)
									{
										if((avail[j]) < needy[i][j])
										{
											flag = 1;
											break;
										}
									}
									if(flag)
									{
										console.log("Process " + i + " doesn't have enough resources");
										console.log("Need: " + needy[i]);
										console.log("Current resources available: " + avail);
                                        var li = document.createElement("li");
                                        li.appendChild(document.createTextNode("Process " + i + " doesn't have enough resources"));
                                        ul2.append(li);
                                        ul1.append(ul2);
                                        prints.appendChild(ul1);
                                        var li = document.createElement("li");
                                        li.appendChild(document.createTextNode("Need: " + needy[i]));
                                        ul2.append(li);
                                        ul1.append(ul2);
                                        prints.appendChild(ul1);
                                        var li = document.createElement("li");
                                        li.appendChild(document.createTextNode("Avail: " + avail));
                                        ul2.append(li);
                                        ul1.append(ul2);
                                        prints.appendChild(ul1);
									}
									else
									{
										exec = exec + 1
										console.log("Process " + i + " has enough resources");
                                        var li = document.createElement("li");
                                        li.appendChild(document.createTextNode("Process " + i + " has enough resources"));
                                        ul2.append(li);
                                        ul1.append(ul2);
                                        prints.appendChild(ul1);
										ex[i] = 1;
										for(var j = 0;j < res; j++)
										{
											avail[j] = avail[j] + alloc[i][j];
										}
										console.log("Current resources available: " + avail);
                                        var li = document.createElement("li");
                                        li.appendChild(document.createTextNode("Avail: " + avail));
                                        ul2.append(li);
                                        ul1.append(ul2);
                                        prints.appendChild(ul1);
									}
								}
							}
                            iter++;
							if(exec1 == exec && exec != pro) // Checks for deadlock
							{
								console.log("Deadlock");
                                var li = document.createElement("li");
                                li.appendChild(document.createTextNode("Deadlock"));
                                prints.appendChild(li);
								break;
							}
							if(exec == pro)
								{
                                    console.log("Safe State");
                                    var li = document.createElement("li");
                                    li.appendChild(document.createTextNode("Safe State"));
                                    prints.appendChild(li);
									break;
								}
						}
			}