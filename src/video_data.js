const video_data = [
    {
        vid_name: "Finance 101", 
        vid_url: "https://www.youtube.com/embed/05iG8iqFFTQ",
        lottie_name: "finance",
        bg_color: "#52bfff",
        line_color: shadeColor("#52bfff0", 15)
    },
    {
        vid_name: "Banking", 
        vid_url: "https://www.youtube.com/embed/d-6qQgvxgAE",
        lottie_name: "saving",
        bg_color: "#c34dfa",
        line_color: shadeColor("#c34dfa", 15)
    },
    {
        vid_name: "Investing", 
        vid_url: "https://www.youtube.com/embed/bJg-rF3bLH0",
        lottie_name: "invest",
        bg_color: "#97ff91",
        line_color: shadeColor("#97ff91", 15)
    },
    {
        vid_name: "Retirement", 
        vid_url: "https://www.youtube.com/embed/J6eWbQr21Qc",
        lottie_name: "retire",
        bg_color: "#ff9c91",
        line_color: shadeColor("#ff9c91", 15)
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