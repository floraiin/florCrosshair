function StoreCrosshairData(data)
    SetResourceKvp("crosshair-data", json.encode(data))
end

function LoadCrosshairData()
    local file = GetResourceKvpString("crosshair-data")
    if (file ~= nil) then
        local data = json.decode(file)
        SendCrosshairData(data)
    end
end

Citizen.CreateThread(function()
    LoadCrosshairData()
end)