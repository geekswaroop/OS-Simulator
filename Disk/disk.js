var pre,v1,v2,v3,v4,v5,v6,dir;
                function getBitStreamAndPlot(event, r1, ini, final, alg, side){
                        var inp=[],r2=r1.split(" "),r3;
                        for(a1=0;a1<r2.length;++a1){
                                if(r2[a1]==""){continue;}
                                r3=parseInt(r2[a1]);
                                inp.push(r3);
                                if((r3>parseInt(final)) || (parseInt(ini)>parseInt(final))){
                                        console.log(r3);
                                        console.log(ini);
                                        console.log(final);
                                        alert("Invalid Input: Final cylinder has to be greater");
                                        return;
                                }
                        }
                        //console.log(r2);
                        //console.log(inp);
                        final=parseInt(final);
                        ini=parseInt(ini);
                        dir=side;
			pre=1;
                        if(alg=="fcfs"){
                                fcfs(inp, ini, final);
                        }
                        if(alg=="sstf"){
                                sstf(inp, ini, final);
                        }
                        if(alg=="scan"){
                                scan(inp, ini, final);
                        }
                        if(alg=="cscan"){
                                cscan(inp, ini, final);
                        }
                        if(alg=="look"){
                                look(inp, ini, final);
                        }
                        if(alg=="clook"){
                                clook(inp, ini, final);
                        }

                }

                function fcfs(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        x1.push(ini);
                        y1.push(0);
                        var a1;
                        for(a1=1;a1<=inp.length;++a1){
                                x1.push(inp[a1-1]);
                                y1.push(-1*a1);
                                if(a1==1){
                                        seek=seek+Math.abs(ini-inp[a1-1]);
                                }
                                else{
                                        seek=seek+Math.abs(inp[a1-2]-inp[a1-1]);
                                }
                        }

                        var layout = {
                                // title: 'FCFS',
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Cylinder Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: false,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: false
                                }
                        };
                        var trace1 = {
                                x: x1,
                                y: y1,
                                type: 'scatter'
                        };

                        var data = [trace1];
                        v1=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                        document.getElementById("alg_name").innerHTML = "FCFS";
                        }
                }
                function sstf(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }

                        x1.push(ini);
                        y1.push(0);
                        var hold=ini;
                        for(a1=1;a1<=inp.length;++a1){
                                var mn=10000;
                                var idx;
                                for(a2=0;a2<inp.length;++a2){
                                        if(visited[a2]==0){
                                                if(Math.abs(hold-inp[a2])<mn){
                                                        idx=a2;
                                                        mn=Math.abs(hold-inp[a2]);
                                                }
                                        }
                                }
                                seek=seek+Math.abs(hold-inp[idx]);
                                visited[idx]=1;
                                hold=inp[idx];
                                x1.push(inp[idx]);
                                y1.push(-1*a1);
                        }
                        var layout = {
                                // title: 'SSTF',
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Cylinder Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: false,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: false
                                }
                        };
                        var trace1 = {
                                x: x1,
                                y: y1,
                                type: 'scatter'
                        };

                        var data = [trace1];
                        v2=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                        document.getElementById("alg_name").innerHTML = "SSTF";
                        }
                }
                function scan(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }

                        x1.push(ini);
                        y1.push(0);
                        inp.sort(function(a, b){return a-b});
                        if((ini<inp[0])||(ini>inp[inp.length-1])){
                                sstf(inp,ini,final);
                                seek=v2;
                                v3=seek;
                                if(pre){
                                // Plotly.newPlot('graph_area', data, layout);
                                document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                                document.getElementById("alg_name").innerHTML = "SCAN";
                                }
                                return;
                        }
                        if(dir=="left"){
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                                var count=1;
                                for(a1=store;a1>=0;--a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                                x1.push(0);
                                y1.push(-1*count);
                                seek=seek+hold;
                                hold=0;
                                ++count;
                                for(a1=store+1;a1<inp.length;++a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                        }
                        else{
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break}}
                                var count=1;
                                for(a1=store;a1<inp.length;++a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        console.log(seek);
                                        hold=inp[a1];
                                }
                                x1.push(final);
                                y1.push(-1*count);
                                seek=seek+parseInt(final)-hold;
                                console.log(seek);
                                hold=final;
                                ++count;
                                for(a1=store-1;a1>=0;--a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        console.log(seek);
                                        hold=inp[a1];
                                }

                        }
                        var layout = {
                                // title: 'SCAN',
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Cylinder Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: false,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: false
                                }
                        };
                        var trace1 = {
                                x: x1,
                                y: y1,
                                type: 'scatter'
                        };

                        var data = [trace1];
                        v3=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                        document.getElementById("alg_name").innerHTML = "SCAN";
                        }
                }
                function cscan(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var x2=[];
                        var y2=[];
                        var x3=[];
                        var y3=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }

                        x1.push(ini);
                        y1.push(0);
                        inp.sort(function(a, b){return a-b});
                        if((ini<inp[0])||(ini>inp[inp.length-1])){
                                sstf(inp,ini,final);
                                seek=v2;
                                v4=seek;
                                if(pre){
                                // Plotly.newPlot('graph_area', data, layout);
                                document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                                document.getElementById("alg_name").innerHTML = "C-SCAN";
                                }
                                return;
                        }
                        if(dir=="left"){
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                                var count=1;
                                for(a1=store;a1>=0;--a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                                x1.push(0);
                                y1.push(-1*count);
                                seek=seek+hold;
                                hold=final;
                                x2.push(0);
                                y2.push(-1*count);
                                x2.push(final);
                                y2.push(-1*count);

                                x3.push(final);
                                y3.push(-1*count);
                                ++count;
                                for(a1=inp.length-1;a1>store;--a1){
                                        x3.push(inp[a1]);
                                        y3.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                        }
                        else{
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break;}}
                                var count=1;
                                for(a1=store;a1<inp.length;++a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                                x1.push(final);
                                y1.push(-1*count);
                                seek=seek+final-hold;
                                hold=0;
                                x2.push(final);
                                y2.push(-1*count);
                                x2.push(0);
                                y2.push(-1*count);

                                x3.push(0);
                                y3.push(-1*count);
                                ++count;
                                for(a1=0;a1<store;++a1){
                                        x3.push(inp[a1]);
                                        y3.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                        }
                        var layout = {
                                // title: 'C-SCAN',
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Cylinder Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: false,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: false
                                }
                        };
                        var trace1 = {
                                x: x1,
                                y: y1,
                                type: 'scatter',
                                name: ''
                        };
                        var trace2 = {
                                x: x2,
                                y: y2,
                                mode: 'lines',
                                name: '',
                                line: {
                                        dash: 'dashdot',
                                        width: 4
                                }
                        };
                        var trace3 = {
                                x: x3,
                                y: y3,
                                type: 'scatter',
                                name: ''
                        };

                        var data = [trace1,trace2,trace3];
                        v4=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                        document.getElementById("alg_name").innerHTML = "C-SCAN";
                        }
                }
                function look(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }

                        x1.push(ini);
                        y1.push(0);
                        inp.sort(function(a, b){return a-b});
                        if((ini<inp[0])||(ini>inp[inp.length-1])){
                                sstf(inp,ini,final);
                                seek=v2;
                                v5=seek;
                                if(pre){
                                // Plotly.newPlot('graph_area', data, layout);
                                document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                                document.getElementById("alg_name").innerHTML = "LOOK";
                                }
                                return;
                        }
                        if(dir=="left"){
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                                var count=1;
                                for(a1=store;a1>=0;--a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                                for(a1=store+1;a1<inp.length;++a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                        }
                        else{
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break}}
                                var count=1;
                                for(a1=store;a1<inp.length;++a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                                for(a1=store-1;a1>=0;--a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                        }
                        var layout = {
                                // title: 'LOOK',
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Cylinder Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: false,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: false
                                }
                        };
                        var trace1 = {
                                x: x1,
                                y: y1,
                                type: 'scatter'
                        };

                        var data = [trace1];
                        v5=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                        document.getElementById("alg_name").innerHTML = "LOOK";
                        }
                }
                function clook(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var x2=[];
                        var y2=[];
                        var x3=[];
                        var y3=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }

                        x1.push(ini);
                        y1.push(0);
                        inp.sort(function(a, b){return a-b});
                        if((ini<inp[0])||(ini>inp[inp.length-1])){
                                sstf(inp,ini,final);
                                seek=v2;
                                v6=seek;
                                if(pre){
                                // Plotly.newPlot('graph_area', data, layout);
                                document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                                document.getElementById("alg_name").innerHTML = "C-LOOK";
                                }
                                return;
                        }
                        if(dir=="left"){
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                                var count=1;
                                for(a1=store;a1>=0;--a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                                x2.push(hold);
                                y2.push(-1*(count-1));
                                x2.push(inp[inp.length-1]);
                                y2.push(-1*(count-1));
                                x3.push(inp[inp.length-1]);
                                y3.push(-1*(count-1));

                                hold=inp[inp.length-1];
                                for(a1=inp.length-2;a1>store;--a1){
                                        x3.push(inp[a1]);
                                        y3.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }
                        }
                        else{
                                var store,hold=ini;
                                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break;}}
                                var count=1;
                                for(a1=store;a1<inp.length;++a1){
                                        x1.push(inp[a1]);
                                        y1.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                                x2.push(hold);
                                y2.push(-1*(count-1));
                                x2.push(inp[0]);
                                y2.push(-1*(count-1));

                                x3.push(inp[0]);
                                y3.push(-1*(count-1));

                                hold=inp[0];
                                for(a1=1;a1<store;++a1){
                                        x3.push(inp[a1]);
                                        y3.push(-1*count);
                                        ++count;
                                        seek=seek+Math.abs(hold-inp[a1]);
                                        hold=inp[a1];
                                }

                        }
                        var layout = {
                                // title: 'C-LOOK',
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Cylinder Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: false,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: false
                                }
                        };
                        var trace1 = {
                                x: x1,
                                y: y1,
                                type: 'scatter',
                                name: ''
                        };
                        var trace2 = {
                                x: x2,
                                y: y2,
                                mode: 'lines',
                                name: '',
                                line: {
                                        dash: 'dashdot',
                                        width: 4
                                }
                        };
                        var trace3 = {
                                x: x3,
                                y: y3,
                                type: 'scatter',
                                name: ''
                        };

                        var data = [trace1,trace2,trace3];
                        v6=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek: "+seek;
                        document.getElementById("alg_name").innerHTML = "C-LOOK";
                        }
                }
                    
