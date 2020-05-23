var p = [];
var index = 1;
var gantt = [];
var colors = ["#e040fb", "#ff80ab", "#3f51b5", "#1e88e5", "#009688", "#4caf50", "#cddc39", "#ffeb3b", "#607d8b", "#ff9800"];
var atat = 0.0;
var awt = 0.0;
var pixel = 0;
var t = 0;
function addToList() {
    var at = document.getElementById("newat").value;
    var bt = document.getElementById("newbt").value;
    var pri = document.getElementById("newpri").value;
    if (isNaN(parseInt(at)) && isNaN(parseInt(bt)) && isNaN(parseInt(pri))) {
        window.alert("Please enter valid inputs");
        return;
    }
    if (isNaN(parseInt(at))) {
        window.alert("Please enter numeric value of arrival time");
        return;
    }
    if (isNaN(parseInt(bt))) {
        window.alert("Please enter numeric value of burst time");
        return;
    }
    if (parseInt(at) < 0 && parseInt(bt) <= 0) {
        window.alert("Invalid inputs");
        return;
    }
    if (parseInt(at) < 0) {
        window.alert("Please enter valid value of arrival time");
        return;
    }
    if (parseInt(bt) <= 0) {
        window.alert("Please enter positive value of burst time");
        return;
    }
    p.push({
        "at": parseInt(at),
        "bt": parseInt(bt),
        "rt": parseInt(bt),
        "id": index,
        "wt": 0,
        "tat": 0,
        "ct": 0,
        "valid": 0,
        "pri":parseInt(pri)
    });
    //window.alert("You submitted!");
    index = index + 1;
    displayList();
    document.getElementById("newat").value = "";
    document.getElementById("newbt").value = "";
    document.getElementById("newpri").value = "";
}

function displayList() {
    var inp = document.getElementById("showinput");
    //inp.setAttribute("style", "height:" + p.length * 80 + "px");
    inp.innerHTML = "";
    for (var i = 0; i < p.length; i++) {
		var card = document.createElement("div");
        //card.setAttribute("class", "card");
        var pid = document.createElement("div");
        pid.textContent = "P" + (i + 1) + "    ";
        pid.setAttribute("style", "float:left;margin-left:20px;");
        //card.setAttribute("style", "float:left;");
        card.setAttribute("style", "width:800px;height: 50px;");
        var input1 = document.createElement("input");
        input1.value = p[i].at;
        input1.setAttribute("class", "form-control text-primary");
        input1.setAttribute("style", "width:50px;float:left;margin-left:100px;text-align:center;");
        input1.setAttribute("disabled", "disabled");
        input1.setAttribute("id", "at" + i);
        var input2 = document.createElement("input");
        input2.value = p[i].bt;
        input2.setAttribute("class", "form-control text-primary");
        input2.setAttribute("disabled", "disabled");
        input2.setAttribute("id", "bt" + i);
        input2.setAttribute("style", "width:50px;float:left;margin-left:100px;text-align:center;");
		var input3 = document.createElement("input");
        input3.value = p[i].pri;
        input3.setAttribute("class", "form-control text-primary");
        input3.setAttribute("disabled", "disabled");
        input3.setAttribute("id", "pri" + i);
        input3.setAttribute("style", "width:50px;float:left;margin-left:100px;margin-right:100px;text-align:center;");
        var btn = document.createElement("button");
        var text1 = document.createTextNode("EDIT");
        btn.appendChild(text1);
        btn.setAttribute("id", "btn" + i);
        btn.setAttribute("class", "btn btn-warning");
        btn.setAttribute("onclick", "edit(this.id)");
        //btn.setAttribute("style", "float:right;margin-right:50px;");
        var br = document.createElement("br");
        card.appendChild(pid);
        //card.appendChild(pid);
        card.appendChild(input1);
        card.appendChild(input2);
        card.appendChild(input3);
        card.appendChild(btn);
        inp.appendChild(card);
    }
}

function edit(id) {
    var pos = parseInt(id.substr(3));
    var button = document.getElementById(id);
    button.innerHTML = "SAVE";
    button.setAttribute("onclick", "save(" + pos + ")");
    document.getElementById("at" + pos).removeAttribute("disabled");
    document.getElementById("bt" + pos).removeAttribute("disabled");
    document.getElementById("pri" + pos).removeAttribute("disabled");
}

function save(pos) {
    at = parseInt(document.getElementById("at" + pos).value);
    bt = parseInt(document.getElementById("bt" + pos).value);
    pri = parseInt(document.getElementById("pri" + pos).value);
    if (isNaN(parseInt(at)) && isNaN(parseInt(bt)) && isNaN(parseInt(pri))) {
        window.alert("Please enter valid inputs");
        return;
    }
    if (isNaN(parseInt(at))) {
        window.alert("Please enter numeric value of arrival time");
        return;
    }
    if (isNaN(parseInt(bt))) {
        window.alert("Please enter numeric value of burst time");
        return;
    }
    if (parseInt(at) < 0 && parseInt(bt) <= 0) {
        window.alert("Invalid inputs");
        return;
    }
    if (parseInt(at) < 0) {
        window.alert("Please enter valid value of arrival time");
        return;
    }
    if (parseInt(bt) <= 0) {
        window.alert("Please enter positive value of burst time");
        return;
    }
    
    p[pos].at = at;
    p[pos].bt = bt;
    p[pos].pri = pri;
    displayList();
}

function pre() {
    //console.log("hi");
    var operation = document.getElementById("operations");
    operation.innerHTML = "";
    var br = document.createElement("br");
    p.sort(function (a, b) {
        return a.at - b.at;
    });
    gantt = [];
    t = 0;
    var tgantt = [];
    var done = 0;
    var count = 0;
    var k = -1;
    var min;
    var prev;
    //execute all processes
    while (done != 1) {
        //find process with min rt
        k = -1;
        min = 9999;
        for (var i = 0; i < p.length; i++) {
            if (p[i].at <= t && p[i].valid == 0 && p[i].pri < min) {
                k = i;
                min = p[i].pri;
            }
        }
        // perform checks
        if (k != prev) {
            var newdiv = document.createElement("div");
            newdiv.setAttribute("style", "text-align: center; margin: auto; width:100%; font-size: 20px;");
            if (k == -1) {
                newdiv.textContent = "t = " + t + ": CPU is idle.";
            }
            else {
                newdiv.textContent = "t = " + t + ": Process-" + p[k].id + " entered CPU and being executed";
            }
            operation.appendChild(br);
            operation.appendChild(newdiv);
            operation.appendChild(br);
        }
        prev = k;
        if (k != -1) {
            p[k].rt -= 1;
            if (p[k].rt == 0) {
                p[k].valid = 1;
                p[k].ct = t + 1;
                p[k].tat = t + 1 - p[k].at;
                p[k].wt = p[k].tat - p[k].bt;
                count += 1;
            }
            if (count == p.length) {
                done = 1;
            }
            tgantt.push({
                "id": p[k].id,
                "start": t,
                "end": t + 1
            });
        }
        else {
            tgantt.push({
                "id": -1,
                "start": t,
                "end": t + 1
            });
        }
        t += 1;
    }
    //find awt & atat
    var total_tat = 0.0, total_wt = 0.0;
    for (var i = 0; i < p.length; i++) {
        total_tat += p[i].tat;
        total_wt += p[i].wt;
    }
    atat = (total_tat / p.length).toFixed(2);
    awt = (total_wt / p.length).toFixed(2);
    //get gantt chart from temporary chart tgantt[]
    var pre = tgantt[0].id;
    var begin = tgantt[0].start;
    var stop;
    for (var i = 1; i < tgantt.length; i++) {
        if (tgantt[i].id == pre) {
            continue;
        }
        else {
            pre = tgantt[i].id;
            stop = tgantt[i - 1].end;
            gantt.push({
                "id": tgantt[i - 1].id,
                "start": begin,
                "end": stop
            });
            begin = tgantt[i].start;
        }
    }
    stop = tgantt[i - 1].end;
    gantt.push({
        "id": tgantt[i - 1].id,
        "start": begin,
        "end": stop
    });
}

function nonpre() {
    //console.log("bye");
    var operation = document.getElementById("operations");
    operation.innerHTML = "";
    var br = document.createElement("br");
    p.sort(function (a, b) {
        return a.at - b.at;
    });
    gantt = [];
    t = 0;
    var done = 0;
    var count = 0, x = 0;
    var k = -1;
    var min;
    while (done != 1) {
        k = -1;
        min = 9999;
        for (var i = 0; i < p.length; i++) {
            if (p[i].at <= t && p[i].valid == 0 && p[i].pri < min) {
                k = i;
                min = p[i].pri;
            }
        }
        if (k == -1) {
            x += 1;
            t += 1;
        }
        else {
            if (x > 0) {
                var newdiv = document.createElement("div");
                newdiv.setAttribute("style", "text-align: center; margin: auto; width:100%; font-size: 20px;");
                newdiv.textContent = "t = " + (t - x) + ": CPU is idle.";
                operation.appendChild(br);
                operation.appendChild(newdiv);
                operation.appendChild(br);
                var tx = t - x;
                gantt.push({
                    "id": -1,
                    "start": tx,
                    "end": t
                });
                x = 0;
            }
            var newdiv = document.createElement("div");
            newdiv.setAttribute("style", "text-align: center; margin: auto; width:100%; font-size: 20px;");
            newdiv.textContent = "t = " + t + ": Process-" + p[k].id + " entered CPU and being executed";
            operation.appendChild(br);
            operation.appendChild(newdiv);
            operation.appendChild(br);
            var tb = t + p[k].bt;
            gantt.push({
                "id": p[k].id,
                "start": t,
                "end": tb
            });
            t = t + p[k].bt;
            p[k].ct = t;
            p[k].tat = t - p[k].at;
            p[k].wt = p[k].tat - p[k].bt;
            p[k].valid = 1;
            count += 1;
        }
        if (count == p.length) {
            done = 1;
        }
    }
    var total_tat = 0.0, total_wt = 0.0;
    for (var i = 0; i < p.length; i++) {
        total_tat += p[i].tat;
        total_wt += p[i].wt;
    }
    atat = (total_tat / p.length).toFixed(2);
    awt = (total_wt / p.length).toFixed(2);
    return;
}

function showOutput() {
    //flg = flag;
    if (p.length == 0) {
        alert("No process to schedule");
        return;
    }
    for (var i = 0; i < p.length; i++) {
        p[i].rt = p[i].bt;
        p[i].valid = 0;
        //p[i].pri = 0;
    }
    var sel = document.getElementById("sel").value;
    if (sel == "pre") {
        pre();
    }
    else {
        nonpre();
    }
    var awt2 = document.getElementById("awt1");
    var atat2 = document.getElementById("atat1");
    awt2.innerHTML = "";
    atat2.innerHTML = "";
    var gt = document.getElementById("gantt");
    gt.innerHTML = "";
    gt.setAttribute("style", "width: 801px; height: 100px; position: relative; margin: auto; border: .5px solid black;");
    var table = document.getElementById("ptable");
    table.innerHTML = "";
    var timer1 = document.getElementById("timer");
    timer1.innerHTML = "";
    var chart_header = document.getElementById("chart-header");
    chart_header.innerHTML = "Gantt Chart";
    var op_header = document.getElementById("operations-heading");
    op_header.innerHTML = "Operation taken place in CPU";
    var table_header = document.getElementById("table-heading");
    table_header.innerHTML = "Output Table";
    var thead = document.getElementById("thead");
    thead.innerHTML = "";
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.textContent = "Process ID";
    tr.appendChild(th1);
    var th2 = document.createElement("th");
    th2.textContent = "Arrival Time";
    tr.appendChild(th2);
    var th3 = document.createElement("th");
    th3.textContent = "Burst Time";
    tr.appendChild(th3);
    var thp = document.createElement("th");
    thp.textContent = "Priority";
    tr.appendChild(thp);
    var th4 = document.createElement("th");
    th4.textContent = "Completion Time";
    tr.appendChild(th4);
    var th5 = document.createElement("th");
    th5.textContent = "Waiting Time";
    tr.appendChild(th5);
    var th6 = document.createElement("th");
    th6.textContent = "Turnaround Time";
    tr.appendChild(th6);
    thead.appendChild(tr);

    var p1 = document.createElement("p");
    p1.textContent = "Average waiting time: " + awt + " units";
    awt2.appendChild(p1);
    var p2 = document.createElement("p");
    p2.textContent = "Average turn around time: " + atat + " units";
    atat2.appendChild(p2);
    drawChart();
    drawTable();
    t = 0;
}

function drawChart() {
    var gt = document.getElementById("gantt");
    var timer1 = document.getElementById("timer");
    pixel = 800 / t;
    for (var i = 0; i < gantt.length; i++) {
        var divWidth = (gantt[i].end - gantt[i].start) * pixel;
        var d = document.createElement("div");
        d.setAttribute("class", "block");
        var id1 = gantt[i].id;
        d.setAttribute("id", "P-" + gantt[i].id);

        if (gantt[i].id == -1) {
            d.textContent = "";
            d.setAttribute("style", "float:left;width:" + divWidth + "px; height:100px;");
        }
        else {
            d.setAttribute("style", "float:left;width: " + divWidth + "px; height: 100px;background-color:" + colors[id1 - 1] + ";font-size:20px;text-align:center;");
            d.textContent = "P-" + gantt[i].id;
        }
        gt.appendChild(d);
        var d1 = document.createElement("div");
        d1.setAttribute("style", "float:left;width:" + divWidth + "px;");
        d1.textContent = gantt[i].start;
        timer1.appendChild(d1);
    }
    var d1 = document.createElement("div");
    d1.setAttribute("style", "float:left;width:3px;");
    d1.textContent = gantt[i - 1].end;
    timer1.appendChild(d1);
}

function drawTable() {
    var table = document.getElementById("ptable");
    p.sort(function (a, b) {
        return a.ct - b.ct;
    });
    for (var i = 0; i < p.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.textContent = p[i].id;
        var td2 = document.createElement("td");
        td2.textContent = p[i].at;
        var td3 = document.createElement("td");
        td3.textContent = p[i].bt;
        var tdp = document.createElement("td");
        tdp.textContent = p[i].pri;
        var td4 = document.createElement("td");
        td4.textContent = p[i].ct;
        var td5 = document.createElement("td");
        td5.textContent = p[i].wt;
        var td6 = document.createElement("td");
        td6.textContent = p[i].tat;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(tdp);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
    }
}

function clearData() {
    var table = document.getElementById("ptable");
    var gt = document.getElementById("gantt");
    gt.setAttribute("style", "width: auto; height: auto; position: relative; margin: auto; border: white;");
    var awt2 = document.getElementById("awt1");
    var atat2 = document.getElementById("atat1");
    var operation = document.getElementById("operations");
    var inp = document.getElementById("showinput");
    inp.innerHTML = "";
    inp.setAttribute("style", "height:auto;")
    operation.innerHTML = "";
    awt2.innerHTML = "";
    atat2.innerHTML = "";
    table.innerHTML = "";
    gt.innerHTML = "";
    var timer1 = document.getElementById("timer");
    timer1.innerHTML = "";
    var chart_header = document.getElementById("chart-header");
    chart_header.innerHTML = "";
    var op_header = document.getElementById("operations-heading");
    op_header.innerHTML = "";
    var table_header = document.getElementById("table-heading");
    table_header.innerHTML = "";
    var thead = document.getElementById("thead");
    thead.innerHTML = "";
    p = [];
    index = 1;
    gantt = [];
    t = 0;
}
