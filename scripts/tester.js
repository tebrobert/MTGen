var mixhex = "ladsbvk;jsdbvljhsd;vkzdscnzdsljcb;zsdcblzsjdch;zsdcblzsdkcbzsdljcbhzds";
var qN = 0;
var itN = 0;
var folderN = "";
var testN = "";
var files = [];
var IntroTableL = [];
var IntroTableR = [];
var Answers = [];

function SaveAnswers()
{
    for (var i = 0; i < itN; i++)
        Answers[i] = document.getElementsByName("answer"+i)[0].value;
}

function SaveTable()
{
    for (var i = 0; i < itN; i++)
    {
        IntroTableL[i] = document.getElementsByName("it"+i+"l")[0].value;
        IntroTableR[i] = document.getElementsByName("it"+i+"r")[0].value;
    }
}

function ElemFill()
{
    document.getElementsByName("n")[0].value = qN;
    document.getElementsByName("it")[0].value = itN;
    document.getElementsByName("folder")[0].value = folderN;
    document.getElementsByName("testname")[0].value = testN;
    for (var i = 0; i < itN; i++)
    {
        if (IntroTableL[i] != undefined)
            document.getElementsByName("it"+i+"l")[0].value = IntroTableL[i];
        if (IntroTableR[i] != undefined)
            document.getElementsByName("it"+i+"r")[0].value = IntroTableR[i];
    }
    for (var i = 0; i < qN; i++)
    {
        if (Answers[i] != undefined)
            document.getElementsByName("answer"+i)[0].value = Answers[i];
    }
}

function ChangeQN(n)
{
    if (n != "")
        qN = n;
    DocumentWriteCreate();
    ElemFill();
}

function ChangeITN(n)
{
    if (n != "")
        itN = n;
    DocumentWriteCreate();
    ElemFill();
}

function ChangeFN(n)
{
    if (n == "")
        return;
    folderN = n;
    for (var i = 0; i < qN; i++)
        files[i] = folderN + "/" + GetAudioName(i);
    DocumentWriteCreate();
    ElemFill();
}

function ChangeTN(n)
{
    if (n == "")
        return;
    testN = n;
}

function GetAudioName(n)
{
    var nu = document.getElementsByName("f" + n)[0].value.replace(/.+[\\\/]/, "");
    return nu;
}

function GetAnswer(n)
{
    var nu = document.getElementsByName("answer" + n)[0].value;
    return nu;
}

function RefreshAudio(n)
{
    files[n] = folderN + "/" + GetAudioName(n);
    DocumentWriteCreate();
    ElemFill();
}
    
function Calculate(fv)
{
    return md5(fv + mixhex);
}

function ch(n)
{
    fv = document.forms[n].f.value;
    sv = md5(fv + mixhex);
    hv = document.forms[n].h.value;
    if (sv == hv)
        document.forms[n].r.value = "RIGHT!!!";
    else
        document.forms[n].r.value = "no";
    chAll(); 
}

function cl(index)
{
    document.forms[index].r.value = "";
}

function chAll()
{
    var c = 1;
    for(i = 0; i < files.length; i++)
    {
        if (document.forms[i].r.value != "RIGHT!!!")
        {
            c = 0;
            break;
        }
    }
    if(c == 1)
        win();
}

function TextareaClear()
{
    var textarea = document.getElementsByName("textarea")[0];
    textarea.value = "";
}

function TextareaWrite(s)
{
    var textarea = document.getElementsByName("textarea")[0];
    textarea.value += s+"\n";
}

function Generate()
{
    TextareaClear();
    TextareaWrite('<html>');
    TextareaWrite('<head>');
    TextareaWrite('<script language="javascript" type="text/javascript" src="scripts/md5.js"></script>');
    TextareaWrite('<script language="javascript" type="text/javascript" src="scripts/tester.js"></script>');
    TextareaWrite('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">');
    TextareaWrite('<title>' + testN + '</title>');
    TextareaWrite('<style>');
    TextareaWrite('    table#de {border-collapse: collapse;}');
    TextareaWrite('    td#de {font-size: 30; border: 1px solid black;}');
    TextareaWrite('</style>');
    TextareaWrite('</head>');
    TextareaWrite('<body>');
    TextareaWrite('    <script language="javascript" type="text/javascript">');
    TextareaWrite('        var files =');
    TextareaWrite('        [');
    
    for (var i = 0; i < qN; i++)
        TextareaWrite('"' + files[i] + '",');
    
    TextareaWrite('        ];');
    TextareaWrite('        ');
    TextareaWrite('        var hashes =');
    TextareaWrite('        [');
    
    for (var i = 0; i < qN; i++)
        TextareaWrite('"' + Calculate(GetAnswer(i)) + '",');
    
    TextareaWrite('        ];');
    TextareaWrite('    </script>');
    TextareaWrite('    ');
    TextareaWrite('    <table id="de">');
    for (var i = 0; i < itN; i++)
    {
        TextareaWrite('        <tr>');
        TextareaWrite('            <td id="de">' + IntroTableL[i] + '</td>');
        TextareaWrite('            <td id="de">' + IntroTableR[i] + '</td>');
        TextareaWrite('        </tr>');
    }
    TextareaWrite('    </table>');
    TextareaWrite('    </p>');
    TextareaWrite('    ');
    TextareaWrite('    <table>');
    TextareaWrite('    <tr>');
    TextareaWrite('        <td> Number </td>');
    TextareaWrite('        <td> Audio </td>');
    TextareaWrite('        <td> Answer </td>');
    TextareaWrite('        <td> Button </td>');
    TextareaWrite('        <td> Verdict </td>');
    TextareaWrite('    </tr>');
    TextareaWrite('    <script language="javascript" type="text/javascript">');
    TextareaWrite('        for (var i = 0; i < files.length; i++)');
    TextareaWrite('        {');
    TextareaWrite('            document.write(\'<tr>\');');
    TextareaWrite('            document.write(\'<form name="form\' + i + \'">\');');
    TextareaWrite('            document.write(\'<td> \' + (i + 1) + \'</td>\');');
    TextareaWrite('            document.write(\'<td><audio controls loop src="src/\' + files[i] + \'"></audio></td>\');');
    TextareaWrite('            document.write(\'<td><input name="f" type="text" value="" oninput="cl(\' + i + \')"></td>\');');
    TextareaWrite('            document.write(\'<input name="h" type="hidden" value="\' + hashes[i] + \'">\');');
    TextareaWrite('            document.write(\'<td><input type="button" value="check" onclick="ch(\' + i + \')"></td>\');');
    TextareaWrite('            document.write(\'<td><input name="r" type="text" value="" readonly></td>\');');
    TextareaWrite('            document.write(\'</form>\');');
    TextareaWrite('            document.write(\'</tr>\');');
    TextareaWrite('        }');
    TextareaWrite('        document.forms[0].f.value = "' + GetAnswer(0) + '";');
    TextareaWrite('    </script>');
    TextareaWrite('    </table>');
    TextareaWrite('    </p>');
    TextareaWrite('');
    TextareaWrite('    <form name="end">');
    TextareaWrite('    <script language="javascript" type="text/javascript">');
    TextareaWrite('    function win()');
    TextareaWrite('    {');
    TextareaWrite('        alert("SUCCESS!!!");');
    TextareaWrite('        document.write(\'<body bgcolor="#000000">\');');
    TextareaWrite('        document.write(\'<font size="7" color="#FF0000">RIGHT!!!</font><br>\');');
    TextareaWrite('        document.write(\'<img src="src/pictures/you-rock.jpg">\');');
    TextareaWrite('        document.write(\'<audio autoplay src="src/sounds/WIN.mp3">\');');
    TextareaWrite('        document.write(\'</body\');');
    TextareaWrite('    }');
    TextareaWrite('    </script>');
    TextareaWrite('    </form>');
    TextareaWrite('    ');
    TextareaWrite('</body>');
    TextareaWrite('</html>');
}
