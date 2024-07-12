a flag que decide se sera deletado é a IsTBD (is to be deleted?)

uma variante é um produto x com descrição ou embalagem diferente:
exemplo:
product name: VENTYV NITRILE POWDER FREE EXAM GLOVE PLUS 35 ELEPHANT
variante1:
description: Glove Exam Nitrile PowderFree PF Polymer Blue XSmall 200bx 10 bxcs 60 csplt Continental US Only
pkg: BX
variante2:
description: Glove Exam Nitrile PowderFree PF Polymer Blue Small 200bx 10 bxcs 60 csplt Continental US Only
pkg: BX
o produto principal é identificado pelo ProductID
itemID = manufacturerItemId
data to be saved:

- manufacturerItemCode
- itemDescription
- imageFileName
- itemImageUrl
- PKG
- unitPrice

importar o csv;
transformar cada uma das linhas em um objeto(usar builder)
salvar todos eles no banco de dados
buscar documentos no banco com limit 10
rodar o prompt do gpt

devo agrupar todos os itens da planilha pelo product id
todos que tiverem o mesmo productId mas com descrição ou pkg diferentes
devo considerar um variant e inserir no array de variants
