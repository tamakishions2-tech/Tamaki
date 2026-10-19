// ===== SUA HISTÓRIA =====
// Passos possíveis em cada cena (use só o que precisar):
//  {bg:"arquivo.jpg"}                    troca o fundo (assets/bg/)
//  {musica:"tema.mp3"} / {musica:""}     toca / para música (assets/audio/)
//  {sfx:"som.mp3"}                       efeito sonoro (assets/audio/)
//  {char:{esq:"a.png", meio:"", dir:""}} personagens (assets/char/); "" remove
//  {fx:"tremer" | "flash" | "escurecer"} efeito visual
//  {nome:"Aiko", texto:"Fala"}           diálogo (sem nome = narração)
//  {set:{coragem:true}}                  guarda uma marca
//  {se:"coragem", texto:"..."}           passo só aparece se a marca existir
//  {escolha:[{texto:"Opção", ir:"cena2", set:{x:true}, se:"marca"}]}
//  {ir:"cena2"}                          pula para outra cena
const STORY = {
  titulo: "Minha Visual Novel",
  inicio: "cena1",
  cenas: {
    cena1: [
      {bg:"", texto:"A chuva batia no telhado do ginásio abandonado."},
      {nome:"Aiko", texto:"Ninguém vem aqui há anos... mas alguma coisa me chamou."},
      {fx:"tremer", texto:"Um estrondo ecoou lá dentro."},
      {escolha:[
        {texto:"Entrar para investigar", ir:"entrar", set:{coragem:true}},
        {texto:"Voltar para casa", ir:"voltar"}
      ]}
    ],
    entrar: [
      {nome:"Aiko", texto:"Respira fundo. Só um passo de cada vez."},
      {se:"coragem", texto:"(Sua coragem faz diferença: a porta se abre sem ranger.)"},
      {ir:"fim"}
    ],
    voltar: [
      {texto:"Você foi embora. Mas o barulho não saiu da sua cabeça."},
      {ir:"fim"}
    ],
    fim: [
      {texto:"Fim da demonstração. Edite o arquivo story.js para criar a sua história."}
    ]
  }
};
