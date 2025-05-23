// <input> 넣었을 때
// 안썼으면 true, 썼으면 false
export const isEmpty = (txt: string) => {
    return txt === "";
};

// <input>, 최소 글자수 넣었을 때
// 짧으면 true, 안짧으면 false
export const lessThan = (txt:string, len:number) => {
    return txt.length < len;
}

// <input>넣었을 때
// 한글 못쓰게, 특수문자, 한자,일본어 등등 들어 있으면 true, 아니면 false
// => 영어, 숫자, 특수문자(-_.@^!) 몇개가 아닌게 들어있으면 true, 그걸로만 구성되어 있으면 false
export const containsHS = (txt:string) => {
    const set1 =
        "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_-@.^!";
    for (let i = 0; i < txt.length; i++) {
        if (!set1.includes(txt[i])) {
            return true;
        }
    }
    return false;
}

// pw, pw확인 같은지
// <input> x2 넣었을 때
// 다르면 true, 같으면 false
export const notEqual = (txt1:string, txt2:string) => {
    return txt1 !== txt2;
}

// pw 조합
// <input>, 문자열 세트를 넣었을 때
// 그게 안들어 있으면 true, 들어있으면 false
export const notContains = (txt:string, set:string) => {
    for (let i = 0; i < set.length; i++) {
        if (txt.includes(set[i])) {
            return false;
        }
    }
    return true;
}


// 숫자만, isNaN만 쓰니까 굳이 만들까 싶지만 통일성 + 띄어쓰기 해도 숫자로 인식하기 때문에 만들어줘야함
// <input>
// 숫자가 아닐 때 true, 맞을 때 false
export const isNotNum = (txt:number) => {
    return isNaN(txt);
}
