export default {
    getFile(url) {
        const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))


        // Here is code for converting "Base64" to javascript "File Object".

        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }


        // Calling both function

        let fileData;
        toDataURL(url)
        .then(dataUrl => {
            console.log('Here is Base64 Url', dataUrl)
            fileData = dataURLtoFile(dataUrl, "image.jpg");
            console.log(fileData);
            return fileData;
            console.log("Here is JavaScript File Object",fileData)
            // fileArr.push(fileData)
            // return fileData;
        })
        console.log(fileData);
        // return fileData;
    }
}