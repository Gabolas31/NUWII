import { useState } from "react";
import { BusinessColors } from "@/lib";
import styles from "./process.module.css";
import {
  AssessmentOutlined as AssessmentIcon,
  BusinessCenterOutlined as BusinessIcon,
  ReceiptOutlined as ReceiptIcon,
  AddBusinessOutlined as AddBusinessIcon,
  CompareArrowsOutlined as CompareIcon,
  TransformOutlined as TransformIcon,
  AccountBalanceOutlined as FinanceIcon,
  LocationOnOutlined as AddressIcon,
} from "@mui/icons-material";

const processData = {
  abrir: {
    steps: [
      {
        title: "Consultoria especializada",
        description: "Nosso time de contadores ajudará você a escolher as melhores atividades, regime tributário e toda a estrutura para otimizar a contabilidade da sua empresa.",
        icon: AssessmentIcon,
      },
      {
        title: "Registro da sua empresa",
        description: "Assumimos toda a parte burocrática e iniciamos o processo de registro da sua empresa, atualizando sobre todas as etapas do processo.",
        icon: BusinessIcon,
      },
      {
        title: "Seu CNPJ está pronto!",
        description: "Após a validação com você e a prefeitura da sua cidade, sua empresa está registrada! Agora, nós assumimos a sua contabilidade e você pode focar no que importa: fazer a sua empresa crescer.",
        icon: ReceiptIcon,
      },
    ],
  },
  trocar: {
    steps: [
      {
        title: "Análise de informações",
        description: "Nossos contadores vão analisar as informações da sua empresa e, em até 24 horas, enviaremos um relatório completo, para que sua empresa esteja regularizada.",
        icon: AssessmentIcon,
      },
      {
        title: "Envio de documentações",
        description: "Agora você só precisa enviar para nossos especialistas todas as documentações necessárias para assumirmos a sua contabilidade.",
        icon: CompareIcon,
      },
      {
        title: "Tudo pronto!",
        description: "Agora sua contabilidade faz parte da NUWII! A partir de agora assumimos toda a parte burocrática e você pode focar no que importa: fazer a sua empresa crescer.",
        icon: BusinessIcon,
      },
    ],
  },
  migrar: {
    steps: [
      {
        title: "Análise do seu MEI",
        description: "Você envia as informações da sua empresa, documentos e extrato de faturamento que nosso time de contadores vai avaliar a necessidade de migração do seu MEI.",
        icon: AssessmentIcon,
      },
      {
        title: "Migração de MEI para ME",
        description: "Vamos definir qual melhor opção de enquadramento do seu CNPJ e realizar todo o processo de transformação do MEI para o ME. Você não precisa se preocupar com nada!",
        icon: TransformIcon,
      },
      {
        title: "Seu novo CNPJ está pronto!",
        description: "Sua empresa já estará regularizada, sem chances de multas e surpresas. E, a partir de agora, você tem uma nova parceira para cuidar da sua contabilidade: a NUWII.",
        icon: ReceiptIcon,
      },
    ],
  },
  consultoria: {
    steps: [
      {
        title: "Análise financeira",
        description: "Nossos especialistas analisam a situação financeira da sua empresa, identificando oportunidades de otimização e pontos de atenção.",
        icon: AssessmentIcon,
      },
      {
        title: "Planejamento estratégico",
        description: "Desenvolvemos um plano personalizado para melhorar a gestão financeira do seu negócio, com foco em crescimento sustentável.",
        icon: FinanceIcon,
      },
      {
        title: "Acompanhamento contínuo",
        description: "Oferecemos suporte contínuo para implementar as estratégias e acompanhar os resultados, garantindo que sua empresa alcance seus objetivos financeiros.",
        icon: BusinessIcon,
      },
    ],
  },
  endereco: {
    steps: [
      {
        title: "Análise de viabilidade",
        description: "Avaliamos a melhor opção de endereço fiscal para sua empresa, considerando localização, custos e requisitos legais.",
        icon: AssessmentIcon,
      },
      {
        title: "Registro do endereço fiscal",
        description: "Realizamos todo o processo de registro do endereço fiscal junto aos órgãos competentes, garantindo a regularização da sua empresa.",
        icon: AddressIcon,
      },
      {
        title: "Endereço fiscal ativo!",
        description: "Seu endereço fiscal está registrado e ativo. Sua empresa pode operar legalmente no endereço escolhido, com toda a documentação em dia.",
        icon: ReceiptIcon,
      },
    ],
  },
};

export function Process() {
  const [activeProcess, setActiveProcess] = useState<'abrir' | 'trocar' | 'migrar' | 'consultoria' | 'endereco'>('abrir');

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Uma contabilidade que te acompanha em cada momento
          </h2>
          <p className={styles.description}>
            Desde a escolha do melhor regime tributário para sua empresa até a rotina contábil do dia a dia, vamos cuidar de tudo para que você possa empreender com segurança e sem preocupações. Veja como é simples abrir sua empresa ou migrar sua contabilidade para a Nuwii.
          </p>
        </div>

        <div className={styles.processBox}>
          {/* Botões de Navegação */}
          <div className={styles.tabsContainer}>
            <button
              onClick={() => setActiveProcess('abrir')}
              className={`${styles.tab} ${activeProcess === 'abrir' ? styles.tabActive : ''}`}
            >
              <div className={styles.tabIcon}>
                <AddBusinessIcon />
              </div>
              Abrir empresa
            </button>
            <button
              onClick={() => setActiveProcess('trocar')}
              className={`${styles.tab} ${activeProcess === 'trocar' ? styles.tabActive : ''}`}
            >
              <div className={styles.tabIcon}>
                <CompareIcon />
              </div>
              Trocar de contador
            </button>
            <button
              onClick={() => setActiveProcess('migrar')}
              className={`${styles.tab} ${activeProcess === 'migrar' ? styles.tabActive : ''}`}
            >
              <div className={styles.tabIcon}>
                <TransformIcon />
              </div>
              Migrar de MEI para ME
            </button>
            <button
              onClick={() => setActiveProcess('consultoria')}
              className={`${styles.tab} ${activeProcess === 'consultoria' ? styles.tabActive : ''}`}
            >
              <div className={styles.tabIcon}>
                <FinanceIcon />
              </div>
              Consultoria Financeira
            </button>
            <button
              onClick={() => setActiveProcess('endereco')}
              className={`${styles.tab} ${activeProcess === 'endereco' ? styles.tabActive : ''}`}
            >
              <div className={styles.tabIcon}>
                <AddressIcon />
              </div>
              Endereço Fiscal
            </button>
          </div>

          {/* Conteúdo do Processo */}
          <div className={styles.stepsContainer}>
            {processData[activeProcess].steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className={styles.step}>
                  <div className={styles.stepIconWrapper}>
                    <div className={styles.stepIcon}>
                      <Icon />
                      <span className={styles.stepNumber}>{index + 1}</span>
                    </div>
                    {index < processData[activeProcess].steps.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

