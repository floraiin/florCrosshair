fx_version 'bodacious'

games { 'rdr3', 'gta5' }

author 'Lance Good'
version '1.0.0'
description 'FiveM Crosshair'

ui_page 'html/index.html'

client_scripts {
	'client/storage.lua',
	'client/main.lua'
}

files {
	'html/index.html',
	'html/style.css',
	'html/main.js'
}


client_script '@dorp-studio/client/link.lua'