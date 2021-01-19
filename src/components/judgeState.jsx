function judgeState() {
    if (localStorage.per < 0.02) {
        localStorage.state = "素面"
    } else if (0.02 <= localStorage.per && localStorage.per < 0.05) {
        localStorage.state = "爽快期"
    } else if (localStorage.per < 0.10) {
        localStorage.state = "ほろ酔い期"
    } else if (localStorage.per < 0.15) {
        localStorage.state = "酩酊初期"
    } else if (localStorage.per < 0.30) {
        localStorage.state = "酩酊期"
    } else if (localStorage.per < 0.40) {
        localStorage.state = "泥酔期"
    } else {
        localStorage.state = "昏睡期"
    }
}
export default judgeState