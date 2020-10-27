const video_data = [
    {
        vid_name: "Finance 101", 
        vid_url: "https://www.youtube.com/embed/05iG8iqFFTQ",
        lottie_name: "finance",
        bg_color: "#52bfff",
        line_color: shadeColor("#52bfff0", 15),
        desc: "Basic building blocks of finance. What are earnings? What can you do with earnings? Save, spend, invest? Click the button below for a more information on the basics of personal finance!"
    },
    {
        vid_name: "Banking", 
        vid_url: "https://www.youtube.com/embed/d-6qQgvxgAE",
        lottie_name: "saving",
        bg_color: "#c34dfa",
        line_color: shadeColor("#c34dfa", 15),
        desc: "Why should you have a bank account? Banks are a secure place to store your money, save for future things, and even invest your money so that your money can work for you! Banks also offer loans for all sorts of things. From buying your first car or house, to starting your own business, a bank can help you with all of this. "
    },
    {
        vid_name: "Investing", 
        vid_url: "https://www.youtube.com/embed/bJg-rF3bLH0",
        lottie_name: "invest",
        bg_color: "#97ff91",
        line_color: shadeColor("#97ff91", 15),
        desc: "Why should you invest? Well remember all the tasks you had to complete to earn your money? When you invest your money into companies, the money is doing all the work for you! It has the potential to make more money that you invested. You have to be careful, however, as there is always a possibility of the investment being bad. We will cover this later on, but for now the important lesson is investing is a smart way to have your money work for you!"
    },
    {
        vid_name: "Retirement", 
        vid_url: "https://www.youtube.com/embed/J6eWbQr21Qc",
        lottie_name: "retire",
        bg_color: "#ff9c91",
        line_color: shadeColor("#ff9c91", 15),
        desc: "Sure retirement might seem like a far far time from now. But its never too early to start thinking about it. Many companies offer 401(k) plans that are a great way to start saving for retirement. The added benefit of this type of account are the contributions made during each year you contribute are taken out of your paycheck allowing for less of your earnings to be eligiible for taxes meaning you may pay less in taxes. Many employers also match part of your contribution allowing for more money invested!"
    }
    
    

]

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export default video_data