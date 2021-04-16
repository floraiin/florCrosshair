RegisterNUICallback("UpdateCrosshairData", function(data)
    StoreCrosshairData(data)
end)

RegisterNUICallback("CloseCrosshairConfig", function(data)
    CloseCrosshairConfig()
end)

function SendCrosshairData(data)
    SendNUIMessage({
        data = data
    })
end

function OpenCrosshairConfig()
    SendNUIMessage({
        toggleUI = true
    })
    SetNuiFocus(true, true)
end

function CloseCrosshairConfig()
    SetNuiFocus(false, false)
end

RegisterCommand("crosshairmenu", function()
    OpenCrosshairConfig()
end, false)

RegisterCommand("cmenudebug", function()
    CloseCrosshairConfig()
end, false)
