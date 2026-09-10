# Cuida Design System

Fonte oficial de tokens: [`tailwind.config.js`](../../tailwind.config.js). Referência visual: [`cuida.png`](cuida.png). Base analisada: Expo 54, React Native 0.81.5, NativeWind 4.2.3 e Tailwind 3.4. Este documento define o tema claro; não configura tema escuro.

## Princípios de design

- **Cuidado e confiança:** verde escuro, creme, dourado, superfícies claras e formas arredondadas preservam a identidade observada na referência.
- **Informação antes de decoração:** nome do paciente, medicamento, dose, horário e estado devem ser fáceis de distinguir. Uma ação principal por contexto.
- **Leitura confortável:** corpo de 18 unidades, hierarquia simples, espaços generosos e suporte ao tamanho de texto do sistema.
- **Segurança na interação:** alvos amplos, feedback explícito, prevenção de acionamentos acidentais e confirmação proporcional à consequência.
- **Consistência incremental:** usar os novos tokens nas próximas telas. Não é necessário migrar todas as telas para adotar esta base.

### Análise da base e da referência

A imagem apresenta cabeçalhos verdes, ações douradas, fundos creme, cards brancos, contornos delicados e estados de emergência vermelhos. É referência de direção visual, não uma medição exata de cores ou dimensões. Os títulos aparentam ser serifados na imagem; a implementação já carrega Figtree 400/500/600/700, que permanece como família oficial, sem introduzir outra fonte.

A configuração já tinha as famílias `green`, `text`, `success`, `warning`, `danger`, `info`, `purple`, além de `background`, `surface`, `border` e `borderLight`. Não tinha escala semântica própria de tipografia, espaçamento, raios ou sombras. Os padrões numéricos vinham do Tailwind/preset.

No código presente, `Input/input.variants.ts` usa `text-xs`, `text-sm`, `text-base`, `font-bold`, `mt-1`, `border-danger`, `text-danger`, `bg-transparent` e `opacity-50`. `KeyboardContainer` usa `bg-cuida-background` e estilos estruturais (`flex`, `flexGrow`, largura percentual e alinhamento). A home é um placeholder; a imagem representa mais telas do que o código atual. Não foram encontrados valores arbitrários de dimensão ou hexadecimais nas telas/componentes presentes. Os exemplos de migração abaixo são orientações, não ocorrências inventadas.

O import de `src/shared/design/colors` apontava para um arquivo ausente e não era utilizado: foi removido da configuração. `danger` não tinha `DEFAULT`, e `transparent` e `cuida.background` não estavam definidos. Esses aliases agora permitem gerar as classes já usadas. Isso pode tornar visíveis cores que antes não eram aplicadas, especialmente o vermelho do Input, sem editar seu código.

A UI/UX Pro Max foi consultada para direção visual e React Native. A busca geral sugeriu ciano, outra fonte, neumorfismo e estrutura de landing page, inadequados a este escopo; essas sugestões não foram adotadas. A busca focada em minimalismo reforçou hierarquia e legibilidade, sem importar sua paleta ou raios. Não houve resultado específico validado para Dynamic Type nas buscas; as regras abaixo usam a referência de acessibilidade da própria skill e a API do React Native. O dataset citava RN 0.86; não foi tratado como especificação da versão instalada.

## Cores

Todos os valores anteriores foram mantidos. Nomes em camelCase geram classes como `bg-primaryLight` e `text-textPrimary`; caminhos aninhados geram `bg-warning-light`.

| Token | Valor | Finalidade e exemplo |
| --- | --- | --- |
| `primary` | `#0F6E56` | Alias de `green.dark`; ação principal, `bg-primary` |
| `primaryLight` | `#E1F5EE` | Alias de `green.light`; seleção suave, `bg-primaryLight` |
| `primaryDark` | `#153E35` | Verde profundo complementar; cabeçalhos e pressão, `active:bg-primaryDark` |
| `accent` | `#EF9F27` | Alias de `warning.primary`; ação dourada, `bg-accent` |
| `accentLight` | `#FAEEDA` | Destaque suave, `bg-accentLight` |
| `accentPressed` | `#D98B1D` | Pressão da ação dourada, `active:bg-accentPressed` |
| `background` | `#FBF6EF` | Fundo creme da tela, `bg-background` |
| `surface` | `#F3ECE0` | Superfície creme secundária, `bg-surface` |
| `surfaceRaised` | `#FFFFFF` | Cards e inputs claros da referência, `bg-surfaceRaised` |
| `textPrimary` | `#1A1A1A` | Alias de `text.primary`; conteúdo principal, `text-textPrimary` |
| `textSecondary` | `#625F58` | Metadados legíveis, `text-textSecondary` |
| `textPlaceholder` | `#68645C` | Sugestão dentro do campo, `placeholder:text-textPlaceholder` |
| `onPrimary` | `#FFFFFF` | Texto sobre `primary`/`primaryDark`, `text-onPrimary` |
| `onAccent` | `#1A1A1A` | Texto sobre dourado, `text-onAccent` |
| `onDanger` | `#FFFFFF` | Texto sobre `danger`/`dangerPressed`, `text-onDanger` |
| `border` | `#E0E0E0` | Separação decorativa, `border-border` |
| `borderLight` | `#F0F0F0` | Divisor sutil, `border-borderLight` |
| `borderStrong` | `#827B70` | Limites de controles, `border-borderStrong` |
| `focus` | `#0F6E56` | Contorno de foco, `focus:border-focus` |
| `disabled` | `#E5DFD5` | Fundo indisponível, `bg-disabled` |
| `onDisabled` | `#625F58` | Texto indisponível, `text-onDisabled` |
| `dangerPressed` | `#822424` | Pressão em ação destrutiva, `active:bg-dangerPressed` |
| `overlay` | `rgba(26, 26, 26, 0.56)` | Fundo de modal, `bg-overlay`; validar composição real |
| `white` / `black` | `#FFFFFF` / `#000000` | Primitivos; preferir papéis semânticos |
| `transparent` | `transparent` | Ausência de preenchimento, `bg-transparent` |
| `cuida.background` | `#FBF6EF` | Compatibilidade: `bg-cuida-background` → futuramente `bg-background` |

### Famílias existentes e estados

| Família | `.primary` preservado | `.light` preservado | `.text` preservado | `DEFAULT` novo e uso |
| --- | --- | --- | --- | --- |
| `success` | `#1D9E75` | `#E1F5EE` | `#0F6E56` | `#0F6E56`: `text-success` / `bg-success` |
| `warning` | `#EF9F27` | `#FAEEDA` | `#854F0B` | `#854F0B`: `text-warning` / `bg-warning` |
| `danger` | `#E24B4A` | `#FCEBEB` | `#A32D2D` | `#A32D2D`: `text-danger` / `bg-danger` |
| `info` | `#378ADD` | `#E6F1FB` | `#0C447C` | `#0C447C`: `text-info` / `bg-info` |
| `purple` | `#534AB7` | `#EEEDFE` | `#3C3489` | Sem DEFAULT; categoria auxiliar, `text-purple-text` |

Para badges: `bg-success-light` com `text-success-text`, e analogamente nas demais famílias. Os `.primary` vivos permanecem disponíveis para acentos; não pressupor que aceitam texto branco.

| Outros tokens legados | Valor | Diretriz |
| --- | --- | --- |
| `green.primary` | `#1D9E75` | Preservado; verde vivo, distinto da nova ação escura `primary` |
| `green.light` | `#E1F5EE` | Preservado; equivalente a `primaryLight` |
| `green.dark` | `#0F6E56` | Preservado; equivalente a `primary` |
| `text.primary` | `#1A1A1A` | Preservado; equivalente a `textPrimary` |
| `text.secondary` | `#888888` | Compatibilidade; migrar conteúdo para `textSecondary` |
| `text.hint` | `#B4B2A9` | Compatibilidade; não usar para instruções essenciais ou placeholder |

A repetição entre `green` e `success` já existia: é útil separar marca de estado, mesmo com valores iguais. Os novos aliases referenciam a paleta local quando possível. `accent` e `warning.primary` compartilham o dourado, mas ação e alerta devem ser diferenciados por texto, ícone e contexto. `purple` permanece opcional; não significa emergência. Não foi introduzida uma escala de dez tons sem necessidade.

### Contraste avaliado

Razões calculadas por luminância relativa sRGB, com cores opacas, arredondadas a duas casas. Não são uma certificação de telas ou de combinações com opacidade.

| Frente / fundo | Razão | Decisão |
| --- | --- | --- |
| `text.secondary` / `background` | 3,30:1 | Insuficiente para texto normal |
| `text.hint` / `background` | 1,98:1 | Insuficiente |
| branco / `green.primary` | 3,39:1 | Evitar em rótulos normais |
| branco / `warning.primary` | 2,17:1 | Usar `onAccent` |
| branco / `danger.primary` | 3,93:1 | Usar fundo `danger` para ação com branco |
| branco / `info.primary` | 3,59:1 | Usar par `info.text` / `info.light` |
| `onPrimary` / `primary` | 6,20:1 | Aprovado para texto normal |
| `textSecondary` / `surface` | 5,42:1 | Aprovado para texto normal |
| `onAccent` / `accent` | 8,00:1 | Aprovado para texto normal |
| `borderStrong` / `surface` | 3,57:1 | Adequado como limite de controle |
| `success.text` / `success.light` | 5,46:1 | Aprovado para texto normal |
| `warning.text` / `warning.light` | 5,87:1 | Aprovado para texto normal |
| `danger.text` / `danger.light` | 6,13:1 | Aprovado para texto normal |
| `info.text` / `info.light` | 8,60:1 | Aprovado para texto normal |

`border` e `borderLight` são decorativos, não identificadores únicos de campos. Fundos creme e cards brancos têm separação sutil: usar agrupamento, espaçamento e limites adequados. A paleta é coerente com a referência e a intenção acolhedora; sua adequação aos idosos depende também de contraste, leitura, tamanho e validação com usuários, não de uma associação universal entre verde e saúde.

## Tipografia

Unidades da tabela: CSS px na configuração, convertidos em unidades lógicas no RN, antes da escala de acessibilidade. `text-*` aplica tamanho e line-height; a família/peso é aplicada separadamente em cada `Text`.

| Papel / classe | Tamanho | Line-height | Peso / classe | Uso |
| --- | --- | --- | --- | --- |
| `text-display` | 32 | 40 | 700 / `font-bold` | Boas-vindas e mensagem principal curta |
| `text-heading` | 28 | 36 | 700 / `font-bold` | Cabeçalho de tela |
| `text-title` | 24 | 32 | 600 / `font-semibold` | Seção ou card principal |
| `text-body` | 18 | 28 | 400 / `font-regular` | Medicamento, dose, instrução e conteúdo |
| `text-bodySmall` | 16 | 24 | 400 / `font-regular` | Informação secundária e inputs |
| `text-caption` | 14 | 20 | 400 / `font-regular` | Metadado não essencial |
| `text-label` | 16 | 24 | 600 / `font-semibold` | Rótulos, botões e estados |

`leading-display`, `leading-heading`, `leading-title`, `leading-body`, `leading-bodySmall`, `leading-caption` e `leading-label` repetem as alturas para exceções justificadas. Em geral, basta `text-body`.

As quatro famílias Figtree já carregadas são preservadas. `font-medium` corresponde a 500. Não acrescentamos pesos sintéticos: no nativo, usar a família real de cada peso; não aplicar `fontWeight: '700'` sobre Figtree Regular. O Tailwind também possui utilitários de peso com nomes como `font-bold`; verificar a fonte renderizada em ambas as plataformas. Não desativar `allowFontScaling`, não limitar arbitrariamente `maxFontSizeMultiplier` e não fixar alturas de textos. Informações de saúde não devem depender de `caption`, caixa alta prolongada ou truncamento.

## Espaçamento

Novos tokens adotam ritmo de 4/8 unidades. Os aliases em px mantêm dimensões previsíveis no nativo e na web sem alterar as classes numéricas antigas.

| Token | Unidades | Classes | Equivalente numérico na web (raiz 16) |
| --- | --- | --- | --- |
| `xs` | 4 | `p-xs`, `gap-xs`, `mt-xs` | `p-1` |
| `sm` | 8 | `p-sm`, `gap-sm` | `p-2` |
| `md` | 16 | `p-md`, `gap-md` | `p-4` |
| `lg` | 24 | `p-lg`, `gap-lg` | `p-6` |
| `xl` | 32 | `p-xl`, `gap-xl` | `p-8` |
| `2xl` | 48 | `p-2xl`, `gap-2xl` | `p-12` |
| `gutter` | 24 | `px-gutter` | `px-6` |

**Compatibilidade de rem:** o Metro atual usa `inlineRem: 14` implicitamente. Portanto `p-4` = 14 unidades nativas, `gap-3` = 10,5, `mt-1` = 3,5 e `ml-2` = 7; na web, com raiz 16, são 16, 12, 4 e 8. São classes válidas preservadas, mas não equivalem exatamente aos novos aliases no nativo. Não mudar `inlineRem` ou sobrescrever a escala numérica sem avaliar as telas. Para novas telas, preferir `p-md gap-sm`; se precisar de 12 unidades como padrão recorrente, propor um token antes de espalhar valores arbitrários.

### Dimensões recorrentes

| Token / classe | Valor | Uso |
| --- | --- | --- |
| `min-h-touch min-w-touch` | 48 × 48 | Área mínima de interação |
| `min-h-button` | 56 | Botões, especialmente na visão do idoso |
| `min-h-input` | 56 | Campos de uma linha; multiline deve crescer |
| `w-icon-sm h-icon-sm` | 20 | Ícone auxiliar |
| `w-icon h-icon` | 24 | Ícone padrão |
| `w-icon-lg h-icon-lg` | 32 | Ícone de destaque |
| `w-avatar h-avatar` | 48 | Avatar |
| `w-avatar-lg h-avatar-lg` | 64 | Avatar de perfil |
| `max-w-content` | 640 | Conteúdo em tablets/web, com `w-full self-center` |
| `max-w-modal` | 480 | Modal, respeitando margens e teclado |

Usar altura mínima com padding, não altura fixa para texto. Insets de safe area, dimensões da janela e teclado são dinâmicos e não devem virar números fixos no Tailwind.

## Border Radius

| Componente | Classe | Raio |
| --- | --- | --- |
| Input | `rounded-input` | 12 |
| Botão | `rounded-button` | 12 |
| Card | `rounded-card` | 16 |
| Modal / sheet | `rounded-modal` / `rounded-t-modal` | 24 |
| Chip / círculo | `rounded-pill` | 9999 |

Um círculo também exige largura e altura iguais. `rounded-full` e todos os raios numéricos originais continuam disponíveis.

## Sombras

| Classe | boxShadow | Elevação Android | Uso |
| --- | --- | --- | --- |
| `shadow-none` | Sem sombra | 0 | Listas e cards com borda |
| `shadow-card` | `0px 2px 4px rgba(26,26,26,0.10)` | 2 | Card que precisa se separar do fundo |
| `shadow-raised` | `0px 4px 8px rgba(26,26,26,0.14)` | 4 | Ação flutuante ou painel sobreposto |
| `shadow-modal` | `0px 8px 16px rgba(26,26,26,0.18)` | 8 | Modal/sheet |

NativeWind v4 converte as sombras para propriedades nativas e utiliza a escala `elevation` com as mesmas chaves no Android. Não é uma dependência da API `boxShadow` do RN mais recente. O resultado visual varia por plataforma; validar em aparelho. Preferir uma sombra simples, sem inset ou múltiplas camadas. Evitar sombra em todo item e evitar recortá-la com `overflow-hidden` no mesmo elemento.

## Botões

Base: `min-h-button min-w-touch px-lg py-md rounded-button items-center justify-center`; texto `text-label font-semibold`. Permitir quebra de linha e crescimento.

| Variante | Container | Texto | Pressionado |
| --- | --- | --- | --- |
| primary | `bg-primary` | `text-onPrimary` | `active:bg-primaryDark` |
| secondary | `bg-accent` | `text-onAccent` | `active:bg-accentPressed` |
| outline | `bg-transparent border-2 border-primary` | `text-primary` | `active:bg-primaryLight` |
| destructive | `bg-danger` | `text-onDanger` | `active:bg-dangerPressed` |
| disabled | `bg-disabled` | `text-onDisabled` | Sem ação |

Na tela verde, a ação dourada pode assumir a prioridade principal do contexto, como “Já tomei” na referência. Não usar branco sobre dourado. Botões outline nesta receita pressupõem fundo claro.

Usar `Pressable`, `accessibilityRole="button"`, nome claro e estado `disabled`/`busy` quando aplicável. Aplicar também `disabled` funcionalmente, não apenas cor ou opacidade. Carregamento mantém rótulo/contexto e evita envios duplicados. Separar ações por pelo menos 8 unidades; dar feedback de pressão sem deslocar o layout. Ações irreversíveis precisam de confirmação contextual; não exigir gesto preciso como único caminho.

## Inputs

- Base: `min-h-input rounded-input border border-borderStrong bg-surfaceRaised px-md py-sm`, com `text-bodySmall font-regular text-textPrimary` no campo.
- Label visível acima: `text-label font-semibold text-textPrimary`, separado por `gap-sm`. Placeholder não substitui label.
- Placeholder: `placeholder:text-textPlaceholder`; testar o encaminhamento de estilo no `TextInput` da versão instalada.
- Erro: `border-danger`, ícone e mensagem `text-bodySmall text-danger font-regular`. Explicar como corrigir, preservando o valor digitado.
- Disabled: `bg-disabled text-onDisabled`, `editable={false}` e estado acessível correspondente. Não depender apenas de `opacity-50`.
- Focus: contorno `border-focus`, mantendo a espessura constante entre estados para não deslocar conteúdo. Em wrapper, usar estado de foco do campo para selecionar classes literais; `focus:` no wrapper não acompanha automaticamente o filho.
- Usar teclado adequado, suporte a colagem/autofill e rolagem com teclado. Campos multiline crescem. Associar o nome acessível ao label e anunciar erros relevantes.

Estas são receitas para implementação futura. O Input atual ainda usa vermelho em todos os estados e não implementa integralmente este contrato; não foi refatorado nesta etapa.

## Cards

Card padrão: `w-full p-md gap-sm rounded-card bg-surfaceRaised border border-border`. Card agrupador secundário: `p-md gap-md rounded-card bg-surface`. Usar `shadow-card` só quando necessário.

Título em `text-title font-semibold` quando houver hierarquia de seção; conteúdo em `text-body font-regular`, metadados em `text-bodySmall font-regular text-textSecondary`. Agrupar nome, dose, horário e estado, mantendo o horário fácil de localizar. Cards clicáveis devem expor papel e nome acessível; evitar botões aninhados em uma área inteira clicável.

## Estados semânticos

| Estado | Par de tokens | Informação adicional obrigatória |
| --- | --- | --- |
| Medicamento pendente | `warning.light` + `warning.text` | Relógio e “Pendente · às 15:00” |
| Medicamento tomado | `success.light` + `success.text` | Check e “Tomado às 08:05” |
| Medicamento atrasado | `danger.light` + `danger.text` | Alerta e “Atrasado · previsto para 08:00” |
| Consulta próxima | `info.light` + `info.text` | Calendário, profissional, data e horário |
| Sucesso | `success.light` + `success.text` | Check e confirmação específica |
| Alerta | `warning.light` + `warning.text` | Atenção, motivo e próximo passo |
| Erro | `danger.light` + `danger.text` | Ícone, explicação e opção de correção/tentativa |
| Emergência | `danger` + `onDanger` | SOS/telefone, mensagem explícita e ação identificada |

Estado de envio deve refletir a resposta real: distinguir “Enviando”, “Alerta enviado” e “Falha ao enviar”. Cor, animação e som nunca são o único sinal. Regras clínicas, tolerância de atraso e contatos acionados pertencem ao produto, não aos tokens visuais. Evitar animação intermitente de emergência.

## Ícones

Preservar Ionicons via `@expo/vector-icons`, já utilizado pelo projeto. Manter o mesmo estilo visual por nível (outline para ações comuns; preenchido para seleção quando acompanhado de label). Tamanhos: auxiliar 20, padrão 24, destaque 32; tamanho do desenho não é área de toque.

Para APIs com `size`/`color`, obter valores dos tokens por um adaptador compatível com Metro, quando necessário; não importar `tailwind.config.js` diretamente no bundle RN, pois carrega o preset de build. `w-icon` não substitui automaticamente `size` em uma fonte de ícones. Usar `cssInterop` apenas se necessário e validar o componente. Não criar emojis como ícones estruturais. Ícones decorativos devem ficar fora da árvore acessível; controles só com ícone precisam de nome e estado.

## Acessibilidade

- Meta de contraste: pelo menos 4,5:1 para todo texto funcional; buscar 7:1 nas informações essenciais quando viável. Indicadores e limites necessários à identificação de controles: 3:1. Essas referências seguem [WCAG — contraste de texto](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) e [contraste não textual](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast).
- Corpo recomendado 18, conteúdo secundário 16, metadados não essenciais no mínimo 14. Essa é a política do Cuida, não um tamanho mínimo universal imposto por WCAG.
- Alvos mínimos de 48 × 48 unidades lógicas; botões preferencialmente com altura mínima 56. Manter pelo menos 8 unidades entre alvos. Hit slop pode complementar, sem sobrepor alvos vizinhos.
- Preservar escala de fonte do sistema, quebra de linha e acesso ao conteúdo completo. Não reduzir texto para caber em cards de altura fixa.
- Usar linguagem direta, labels visíveis e horários explícitos. Dose e medicamento devem continuar legíveis com fontes ampliadas.
- Comunicar seleção, pressão, carregamento, erro e sucesso visualmente e com semântica acessível. Não depender apenas de cor, som, gesto ou ícone.
- Testar VoiceOver/TalkBack, ordem de leitura, foco, orientação horizontal, teclado, safe areas, fonte ampliada e redução de movimento. Referência de API: [React Native 0.81 — Text](https://reactnative.dev/docs/0.81/text#allowfontscaling).
- Não presumir conformidade apenas por usar os tokens: novas telas precisam de validação em iOS/Android, celulares pequenos e tablets, incluindo idosos e cuidadores quando possível.

## Regras de implementação

Preferir tokens semânticos em classes completas e estáticas:

```tsx
<View className="p-md gap-sm rounded-card bg-surface">
  <Text className="text-title font-semibold text-textPrimary">Remédios de hoje</Text>
  <Text className="text-body font-regular text-textSecondary">Próximo horário: 15:00</Text>
</View>

<Pressable
  accessibilityRole="button"
  className="min-h-button min-w-touch px-lg py-md rounded-button bg-primary active:bg-primaryDark items-center justify-center"
>
  <Text className="text-label font-semibold text-onPrimary">Já tomei</Text>
</Pressable>
```

Exemplo visual; conectar eventos, estado e feedback ao implementar. Também válido para preservar a escala antiga:

```tsx
<View className="p-4 gap-3 rounded-card bg-surface" />
```

Evitar:

```tsx
<View className="p-[17px] gap-[11px] rounded-[13px] bg-[#FFFFFF]" />
<Text className="text-[17px] leading-[23px]">Dose</Text>
```

- Não construir classes como `bg-${status}`: mapear estado para strings completas (`"bg-success-light"`, `"bg-danger-light"`) dentro de `src`, coberto pelo `content` atual.
- Não assumir herança de cor/fonte de `View` para `Text`; aplicar no próprio texto.
- Usar `theme.extend` para novos tokens dimensionais, preservando os padrões e o preset. A paleta continua explícita em `theme.colors`, sem habilitar arbitrariamente todas as cores padrão do Tailwind.
- Valores dinâmicos calculados, animações, safe areas e APIs que não aceitam classes podem usar `style`. Repetição visual estática deve virar token após avaliar sua finalidade.
- Não atualizar NativeWind/Tailwind nem modificar Metro para adotar este documento. A diferença de rem é documentada no [anúncio do NativeWind v4](https://www.nativewind.dev/blog/announcement-nativewind-v4) e confirmada no código instalado.
- Antes de ampliar componentes com `tailwind-variants`/`tailwind-merge`, verificar que a mesclagem distingue `text-body` de `text-textPrimary` e preserva as classes desejadas. A dependência atual de merge é v3 enquanto Tailwind é v3; integração e eventuais ajustes ficam para a etapa dos componentes.

### Migração posterior

| Classe/padrão | Próxima ação |
| --- | --- |
| `bg-cuida-background` | Preferir `bg-background`; alias permanece |
| `text-xs`, `text-sm`, `text-base` no Input | Migrar conforme papel para `text-caption`, `text-bodySmall`, `text-body`; revisar fonte ampliada |
| `text-danger` / `border-danger` em todos os estados do Input | Agora geram a cor escura; restringir ao erro, usar tokens neutros/foco nos outros estados |
| `opacity-50` para disabled | Adotar cores disabled e bloqueio funcional/semântica |
| `text-text-secondary` / `text-text-hint`, se usados futuramente ou em branches antigas | Preferir `text-textSecondary` / `text-textPlaceholder` |
| Branco sobre `bg-green-primary`, `bg-warning-primary`, `bg-danger-primary`, `bg-info-primary` | Revisar pares antes de usar; não migrar automaticamente todo uso de acento |
| `p-4`, `mt-1`, `ml-2`, demais numéricos | Permanecem válidos; aliases semânticos mudam dimensões no nativo e exigem revisão visual |

### Escopo e validação

Esta etapa altera apenas a configuração e este documento. Mantém todas as cores e famílias de fontes prévias, `content`, preset NativeWind e plugins. Adiciona aliases acessíveis, estados pressionados/disabled, superfície branca, tipografia, espaçamento, raios, sombras/elevações e dimensões. Nenhuma tela ou componente foi refatorado. A geração de estilos pode corrigir classes anteriormente ausentes; a aplicação integral das receitas e testes visuais em dispositivos fica para a implementação das próximas telas.
