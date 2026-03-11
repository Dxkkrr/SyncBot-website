const supabaseURL = "https://xwmadfovqatqkvogcwkh.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bWFkZm92cWF0cWt2b2djd2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMTQ1NjgsImV4cCI6MjA4ODY5MDU2OH0.9kS0vCO9moDEtf4DELUp4Zyb5U32ioTpB1pE6Qo9D84"

const supabaseClient = supabase.createClient(supabaseURL, supabaseKey)

async function carregarUsuario(){

const { data: { user } } = await supabaseClient.auth.getUser()

if(!user){
window.location.href = "loginPage.html"
return
}

const discord_id = user.user_metadata.provider_id
const username = user.user_metadata.full_name || user.user_metadata.name
const avatar = user.user_metadata.avatar_url
const email = user.email

document.getElementById("username").innerText = username
document.getElementById("avatar").src = avatar

const { error } = await supabaseClient
.from("usuarios")
.upsert({
id: user.id,
discord_id: discord_id,
username: username,
email: email,
avatar: avatar
})

if(error){
console.error("Erro ao salvar:", error)
}

}

carregarUsuario()