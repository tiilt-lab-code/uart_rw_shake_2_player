bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    bluetooth.startUartService()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (cmd == "start") {
        basic.showString(cmd)
        running = 1
        score = 0
    } else if (cmd == "end") {
        running = 0
        if (score < 20) {
            basic.showIcon(IconNames.No)
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (running == 1) {
        score += 1
        led.plotBarGraph(
        score,
        20
        )
        if (score >= 20) {
            bluetooth.uartWriteString("end")
            running = 0
            basic.showIcon(IconNames.Yes)
        }
    }
})
let score = 0
let cmd = ""
let running = 0
basic.showIcon(IconNames.Asleep)
running = 0
