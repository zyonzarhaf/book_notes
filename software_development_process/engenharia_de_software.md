# Notes on Engenharia de Software, Sommerville

### Breve mapa:

- Cap. 1: O que é Engenharia de Software.

- Cap. 2: Processos de Desenvolvimento de Software sob um viés mais genérico, incluindo suas atividades básicas.

- Cap. 3: Métodos Ágeis de desenvolvimento de software.

- Cap. 4 em diante: Atividades de processos, sob um viés mais detalhado.

## Engenharia de Software

Disciplina de engenharia que se preocupa com a sistematização e organização da produção de software profissional.

## Processo de Desenvolvimento de Software

A sistematização e organização da produção de software implica na existênciade diferentes processos de desenvolvimento. 

Um processo de desenvolvimento de software é uma sequência de atividades que culminam na criação de um produto de software, ou seja, um programa manutenível, confiável, seguro, eficiente e aceitável, incluindo todos os documentos produzidos durante o processo de desenvolvimento.

Existem quatro atividades que são fundamentais para todos os processos de software:

1. Especificação de Software: definição das funcionalidades do software e suas restrições.

2. Desenvolvimento de Software: produção do software para atender às especificações definidas.

3. Validação de Software: validação do software para garantir que ele atende às demandas do cliente.

4. Evolução de Software: evolução do software para atender às necessidades de mudança do cliente.

Contudo, o nível de detalhamento e organização dessas atividades genéricas varia com base no tipo de processo escolhido, motivado pelo tipo de software a ser produzido.

## Modelos Genéricos de Processo de Desenvolvimento de Software

Três modelos gerais de processo podem ser identificados e utilizados como ponto de partida para compreender processos mais específicos:

### Modelo em Cascata

As atividades são sequenciais e o produto de software somente é entregue após a conclusão de todas elas. As atividades detalhadas do processo que segue esse modelo são cinco: análise e def. de requisitos; projeto de sistema e software; implementação e teste unitário; integração e teste de sistema; operação e manutenção.

### Modelo Incremental

As atividades são sequenciais, mas ocorrem em iterações relativamente curtas e a entrega é feita ao final de cada iteração, de modo a incrementar o resultado final. Frequentemente os incrementos iniciais incluem as funcionalidades mais importantes ou mais urgentes.

### Modelo de Reuso 

As atividades consistem em integrar componentes de um sistema já existente em vez de desenvolvê-lo do zero. As atividades detalhadas do processo que segue esse modelo são seis: espec. de requisitos; análise de componentes; modificação de requisitos; projeto do sistema com reúso; desenvolvimento e integração; validação de sistema.

## Atividades Genéricas de Processo de Desenvolvimento de Software

### Engenharia de Requisitos 

A primeira atividade que é comum a todos os processos de desenvolvimento é a especificação de software, também chamada de engenharia de requisitos, definição de requisitos, especificação de requisitos, entre outras tantas nomenclaturas que, em geral, designam a mesma coisa: a estabelecer o que o software deve fazer.

A depender do nível de complexidade do processo, essa atividade pode ser divida em outras sub-atividades, como:

1. Estudo de Viabilidade: estimativa da possibilidade de se satisfazerem as necessidades do usuário identificado usando-se tecnologias atuais de software e hardware.

2. Elicitação e Análise de Requisitos: definição dos requisitos propriamente ditos do software através de discussões, prototipações, observação de sistemas existentes, entre outras técnicas. Os requisitos devem ser dividos em funcionais e não-funcionais. Requisitos funcionais são ações que o software deve realizar, ao passo que requisitos não-funcionais são propriedades que o software deve possuir, como performance, segurança, compatibilidade entre plataformas, entre outras. São mais difíceis de interpretar e podem afetar mais de um componente do sistema de uma só vez, ou outros requisitos funcionais e não funcioanis. Por isso, é importante expressar os requisitos não funcionais de forma quantitativa sempre que possível.

3. Especificação de Requisitos: tradução dos requisitos coletados na sub-atividade anterior em um documento, classificando-os em requisitos do usuário (descrição de alto nível) e requisitos do sistema (descrição de baixo nível -- muitas vezes é um desdobramento de um requisito mais simples, gerando váriios requisitos mais detalhados). O documento gerado nesse momento é chamado de SRS -- Software Requirements Specification. Dentro de processos ágeis o documento em si pode ser substituído por outros elementos menos formais, como cartões de estórias de usuários. Um modelo de SRS pode ser encontrado em SOMMERVILLE (2011, p. 79).

4. Validação de Requisitos: Identificação e correção de erros no documento anterior.

### Projeto e Implementação de Software

Também chamada de desenvolvimento de software, é a tradução das especificações do software em um sistema execútável.

A depender do nível de complexidade do processo, essa atividade pode ser dividida em outras sub-atividades, como:

1. Projeto de Arquitetura: definição da estrutura geral do sistema, incluindo seus componentes principais e o relacionamento entre eles.

2. Projeto de Interface: definição das interfaces entre os componentes, ou seja, como eles se comunicam entre si.

3. Projeto de Componente: definição da estrutura geral de cada componente.

4. Projeto de Banco de Dados: definição da estrutura geral dos dados do sistema.

### Validação de Software

Também chamada de verificação e validação (V&V), é a demonstração de que o software satisfaz os requisitos levantados e especificados na primeira atividade.

A depender do nível de complexidade do processo, essa atividade pode ser divida em outras sub-atividades, como:

1. Testes de Desenvolvimento: testagem individual dos componentes desenvolvidos. Os componentes podem ser desde funções ou classes individuais até agrupamentos coerentes dessas construções. Testes unitários são utilizados nesse caso.

2. Testes de Sistema: testagem de componentes integrados que formam um subsistema ou o sistema todo. Testes de integração e testes end-to-end são utilizados nesse caso.

3. Testes de Aceitação: também chamado de teste alfa, é testagem do sistema totalmente integrado utilizando-se dados reais fornecidos pelo cliente. Dados reais estressam o sistema de forma diferente dos dados de teste. Se tudo ocorrer bem, esse teste leva ao teste beta, no qual o sistema é entregue a um número de potenciais clientes que concordaram em usá-lo.

### Evolução do Software
