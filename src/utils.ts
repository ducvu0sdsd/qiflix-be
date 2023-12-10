import { SubtitleItemInterface } from "./subtitle/schema/subtitle.schema";

export const randomVerifyCode: () => string = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const formattedNumber = randomNumber.toString().padStart(6, '0');
    return formattedNumber;
}


export const handleSRTFile: (str: string) => SubtitleItemInterface[] = (str) => {
    const arr: string[] = str.split('\n')
    const subtitles: SubtitleItemInterface[] = []
    let subtitle: SubtitleItemInterface = { id: 0, firstTime: 0, lastTime: 0, content: '' }
    arr.forEach((item, index) => {
        if (/[0-9]{1,6}\r/.test(item) && !item.includes(' --> ')) { // id
            const i = parseInt(item.replace('\r', ''))
            subtitle.id = i
        } else if (item.includes(' --> ')) { // time
            const times = item.split(' --> ')
            times.forEach((time, index) => {
                const timeSlipt = time.split(',')[0]
                if (index == 0) {
                    const first: number = timeStringToSeconds(timeSlipt)
                    subtitle.firstTime = first
                } else {
                    const last: number = timeStringToSeconds(timeSlipt)
                    subtitle.lastTime = last
                }
            })
        } else if (/[A-ZÀ-Ỹa-zà-ỹ0-9]+/.test(item.replace('- ', '')) && !item.includes(' --> ')) {
            subtitle.content += (' ' + item.replace('\r', '').replace('<i>', '').replace('</i>', ''))
        } else if (item === '\r') {
            console.log(subtitle)
            subtitles.push(subtitle)
            subtitle = { id: 0, firstTime: 0, lastTime: 0, content: '' }
        }
    })

    return subtitles;
}

const timeStringToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
};