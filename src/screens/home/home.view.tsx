import { colors } from "@/shared/design/colors";
import { useUserStore } from "@/shared/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, type ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { demoPatients, type HomeDose } from "./home.data";

type IconName = keyof typeof Ionicons.glyphMap;
type Filter = "Todos" | "Pendentes" | "Registrados";
type Panel =
  | "patients"
  | "profile"
  | "notifications"
  | "appointment"
  | "history"
  | "health"
  | "emergency"
  | null;

function Icon({
  name,
  color = colors.text.primary,
  size = 24,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}

function Action({
  label,
  onPress,
  icon,
  accent = false,
}: {
  label: string;
  onPress: () => void;
  icon?: IconName;
  accent?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`min-h-button min-w-touch flex-row items-center justify-center gap-sm rounded-button px-md py-sm ${accent ? "bg-success-light" : "bg-success-light"}`}
    >
      {icon && (
        <Icon
          name={icon}
          color={accent ? colors.success.primary : colors.green.dark}
          size={20}
        />
      )}
      <Text
        className={`shrink font-semibold text-label ${accent ? "text-text-primary" : "text-text-primary"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Card({
  title,
  icon,
  children,
  footer,
  onPress,
}: {
  title: string;
  icon: IconName;
  children: ReactNode;
  footer?: string;
  onPress?: () => void;
}) {
  return (
    <View className="gap-md rounded-card border border-border bg-surface p-md">
      <View className="flex-row items-start justify-between gap-sm">
        <Text
          accessibilityRole="header"
          className="flex-1 font-semibold text-title text-text-primary"
        >
          {title}
        </Text>
        <View className="rounded-button bg-background p-sm">
          <Icon name={icon} size={20} />
        </View>
      </View>
      {children}
      {footer && onPress && (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          className="min-h-touch flex-row items-center justify-center gap-sm rounded-button bg-info-light"
        >
          <Text className="shrink font-semibold text-label text-text-primary">
            {footer}
          </Text>
          <Icon name="arrow-forward-outline" size={20} />
        </Pressable>
      )}
    </View>
  );
}

export default function HomeView() {
  const [patients, setPatients] = useState(demoPatients);
  const [patientId, setPatientId] = useState(demoPatients[0].id);
  const [filter, setFilter] = useState<Filter>("Todos");
  const [panel, setPanel] = useState<Panel>(null);
  const [confirmDose, setConfirmDose] = useState<HomeDose | null>(null);
  const [feedback, setFeedback] = useState("");
  const logout = useUserStore((state) => state.logout);
  const { width, fontScale } = useWindowDimensions();
  const compact = width < 380 || fontScale > 1.2;
  const patient = patients.find((item) => item.id === patientId)!;
  const isMaria = patient.id === "demo-maria";
  const registered = patient.doses.filter((dose) => dose.recordedAt);
  const next = patient.doses.find((dose) => !dose.recordedAt);
  const visibleDoses = patient.doses.filter(
    (dose) =>
      filter === "Todos" ||
      (filter === "Registrados" ? !!dose.recordedAt : !dose.recordedAt),
  );
  const weeklyCount = 22 + registered.length;
  const weeklyPercent = Math.round((weeklyCount / 28) * 100);
  const panelTitles: Record<Exclude<Panel, null>, string> = {
    patients: "Quem você quer cuidar?",
    profile: "Meu espaço",
    notifications: "Notificações",
    appointment: "Detalhes da consulta",
    history: "Histórico de medicamentos",
    health: "Adicionar registro",
    emergency: "Emergência",
  };
  const closeModal = () => {
    setPanel(null);
    setConfirmDose(null);
  };

  function recordDose() {
    if (!confirmDose) return;
    const recordedAt = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setPatients((current) =>
      current.map((item) =>
        item.id !== patientId
          ? item
          : {
              ...item,
              doses: item.doses.map((dose) =>
                dose.id === confirmDose.id && !dose.recordedAt
                  ? { ...dose, recordedAt }
                  : dose,
              ),
            },
      ),
    );
    setFeedback(
      `${confirmDose.name}: dose registrada às ${recordedAt} nesta demonstração.`,
    );
    setConfirmDose(null);
  }

  return (
    <SafeAreaView className="flex-1 bg-surface px-md pt-md" edges={["top"]}>
      <View className="w-full flex-row items-center justify-end gap-sm">
        <Pressable
          onPress={() => setPanel("notifications")}
          className="min-h-touch min-w-touch items-center justify-center rounded-button"
        >
          <Icon name="notifications-outline" />
        </Pressable>
        <Pressable
          onPress={() => setPanel("profile")}
          className="h-avatar w-avatar items-center justify-center rounded-pill bg-green-light"
        >
          <Text className="font-semibold text-caption text-text-primary">
            GM
          </Text>
        </Pressable>
      </View>
      <ScrollView className="flex-1" contentContainerClassName="gap-md pb-lg">
        <View className="gap-sm">
          <View className="flex-row items-center gap-sm">
            <Text className="shrink font-semibold text-heading text-text-primary">
              Bom dia, Guilherme
            </Text>
            <Icon name="sunny" color={colors.warning.text} size={32} />
          </View>
          <Text className="font-regular text-caption text-text-secondary">
            Um novo dia para cuidar de quem importa.
          </Text>
        </View>

        <View className="gap-md rounded-card border border-border bg-surface p-md">
          <View className="flex-row items-center gap-md">
            <View className="flex-1 gap-xs">
              <Text className="font-semibold text-caption text-text-secondary">
                {patient.recipient === "self"
                  ? "Cuidando de Você"
                  : "Você está cuidando de"}
              </Text>
              <Text className="font-bold text-title text-text-primary">
                {patient.name}
              </Text>
              {patient.age && (
                <Text className="font-regular text-bodySmall text-text-secondary">
                  {patient.age} anos
                </Text>
              )}
            </View>
          </View>
          <Action
            label="Ver pacientes"
            icon="people-outline"
            onPress={() => setPanel("patients")}
          />
        </View>

        <View className="gap-md rounded-card bg-green-dark p-md">
          <View className="flex-row flex-wrap items-center justify-between gap-sm">
            <Text className="font-bold text-caption text-background">
              PRÓXIMO REMÉDIO
            </Text>
            <View className="flex-row items-center gap-xs">
              <Icon name="time-outline" color={colors.background} size={20} />
              <Text className="font-regular text-bodySmall text-background">
                Hoje
              </Text>
            </View>
          </View>
          {next ? (
            <>
              <View
                className={`${compact ? "gap-sm" : "flex-row items-start gap-md"}`}
              >
                <View className={compact ? "gap-xs" : "flex-1 gap-xs"}>
                  <Text className="font-bold text-heading text-background">
                    {next.name}
                  </Text>
                  <Text className="font-regular text-body text-background">
                    {next.dosage}
                  </Text>
                </View>
                <Text className="font-bold text-heading text-background">
                  {next.time}
                </Text>
              </View>
              <View className="flex-row items-center gap-sm">
                <Icon
                  name="information-circle-outline"
                  color={colors.background}
                  size={20}
                />
                <Text className="flex-1 font-regular text-bodySmall text-background">
                  Conforme orientação cadastrada.
                </Text>
              </View>
              <Action
                accent
                label="Registrar como tomado"
                icon="checkmark-outline"
                onPress={() => setConfirmDose(next)}
              />
            </>
          ) : (
            <Text className="font-semibold text-body text-background">
              {patient.doses.length
                ? "Todas as doses de hoje foram registradas."
                : "Nenhum remédio cadastrado para você."}
            </Text>
          )}
        </View>

        <Card
          title="Remédios de hoje"
          icon="medical-outline"
          footer="Ver histórico de medicamentos"
          onPress={() => setPanel("history")}
        >
          <Text className="font-regular text-bodySmall text-text-secondary">
            {registered.length} de {patient.doses.length} doses registradas
          </Text>
          <View className="flex-row flex-wrap gap-sm rounded-button bg-background p-xs">
            {(["Todos", "Pendentes", "Registrados"] as const).map((item) => (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                className={`min-h-touch min-w-touch grow items-center justify-center rounded-button px-sm py-sm ${filter === item && "bg-green-light"}`}
              >
                <Text
                  className={`font-semibold text-caption ${filter === item ? "text-primary" : "text-text-secondary"}`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          {visibleDoses.map((dose) => (
            <View
              key={dose.id}
              className={`gap-sm border-t border-border pt-md ${compact ? "" : "flex-row items-start"}`}
            >
              <Text className="font-semibold text-body text-text-primary">
                {dose.time}
              </Text>
              <View className={compact ? "gap-xs" : "flex-1 gap-xs"}>
                <Text className="font-semibold text-bodySmall text-text-primary">
                  {dose.name}
                </Text>
                <Text className="font-regular text-caption text-text-secondary">
                  {dose.dosage}
                </Text>
                <Text
                  className={`self-start rounded-button px-sm py-xs font-medium text-caption ${dose.recordedAt ? "bg-success-light text-success-text" : dose.id === next?.id ? "bg-warning-light text-warning-text" : "bg-background text-text-secondary"}`}
                >
                  {dose.recordedAt
                    ? `Registrado às ${dose.recordedAt} · Guilherme`
                    : dose.id === next?.id
                      ? "Próxima dose"
                      : "Programado"}
                </Text>
              </View>
              {dose.recordedAt ? (
                <Icon
                  name="checkmark-circle-outline"
                  color={colors.success.DEFAULT}
                />
              ) : (
                <Pressable
                  onPress={() => setConfirmDose(dose)}
                  className="min-h-touch min-w-touch items-center justify-center self-start rounded-button bg-warning-light"
                >
                  <Icon name="add-outline" color={colors.text.primary} />
                </Pressable>
              )}
            </View>
          ))}
          {!visibleDoses.length && (
            <Text className="font-regular text-bodySmall text-text-secondary">
              {patient.doses.length
                ? "Nenhuma dose neste filtro."
                : "Seus medicamentos aparecerão aqui quando forem cadastrados."}
            </Text>
          )}
        </Card>

        <Card
          title="Próxima consulta"
          icon="calendar-outline"
          footer={isMaria ? "Ver detalhes da consulta" : undefined}
          onPress={() => setPanel("appointment")}
        >
          {isMaria ? (
            <>
              <View className="flex-row items-start gap-md">
                <View className="items-center rounded-button bg-warning-light p-md">
                  <Text className="font-semibold text-caption text-warning-text">
                    SET
                  </Text>
                  <Text className="font-bold text-body text-warning-text">
                    11
                  </Text>
                  <Text className="font-medium text-caption text-warning-text">
                    SEXTA
                  </Text>
                </View>
                <View className="flex-1 gap-xs">
                  <Text className="self-start rounded-button bg-success-light px-sm font-medium text-caption text-success-text">
                    Confirmada
                  </Text>
                  <Text className="font-semibold text-title text-text-primary">
                    Generalista
                  </Text>
                  <Text className="font-regular text-bodySmall text-text-secondary">
                    Dra. Fernanda Silva
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-sm">
                <Icon
                  name="location-outline"
                  size={20}
                  color={colors.text.primary}
                />
                <Text className="flex-1 font-regular text-bodySmall text-text-secondary">
                  Clínica Vida - 14:30
                </Text>
              </View>
            </>
          ) : (
            <Text className="font-regular text-bodySmall text-text-secondary">
              Nenhuma consulta agendada para você.
            </Text>
          )}
        </Card>

        <Card
          title="Uma rotina de cuidado"
          icon="trending-up-outline"
          footer="Acompanhar histórico"
          onPress={() => setPanel("history")}
        >
          <Text className="font-regular text-caption text-text-secondary">
            Adesão aos medicamentos nos últimos 7 dias.
          </Text>
          {isMaria ? (
            <>
              <Text className="font-bold text-display text-text-primary">
                {weeklyPercent}%
              </Text>
              <View
                accessibilityValue={{ min: 0, max: 28, now: weeklyCount }}
                className="h-sm overflow-hidden rounded-pill bg-surface"
              >
                <View
                  className="h-full rounded-pill bg-primary"
                  style={{ width: `${weeklyPercent}%` }}
                />
              </View>
              <Text className="font-regular text-bodySmall text-text-secondary">
                {weeklyCount} de 28 doses com tomada registrada
              </Text>
              <View className="flex-row items-end justify-between gap-xs">
                {[4, 3, 4, 4, 3, 4, registered.length].map((count, index) => (
                  <View key={index} className="flex-1 items-center gap-xs">
                    <View className="h-avatar w-icon justify-end rounded-button bg-surface">
                      <View
                        className={`w-full rounded-button ${count === 4 ? "bg-success-primary" : "bg-warning-primary"}`}
                        style={{ height: `${(count / 4) * 100}%` }}
                      />
                    </View>
                    <Text className="font-medium text-caption text-text-secondary">
                      {["D", "S", "T", "Q", "Q", "S", "S"][index]}
                    </Text>
                  </View>
                ))}
              </View>
              <Text className="font-regular text-caption text-text-secondary">
                Confirmações registradas, não ingestão verificada.
              </Text>
            </>
          ) : (
            <Text className="font-regular text-bodySmall text-text-secondary">
              Ainda não há doses registradas para calcular sua rotina.
            </Text>
          )}
        </Card>

        <Card title="Saúde em dia" icon="pulse-outline">
          <Text className="font-regular text-bodySmall text-text-secondary">
            Últimos registros de saúde
          </Text>
          {isMaria ? (
            [
              {
                icon: "pulse-outline" as const,
                label: "Pressão arterial",
                value: "120/80",
                unit: "mmHg",
                detail: "Hoje, 08:15 · Ana",
              },
              {
                icon: "water-outline" as const,
                label: "Glicemia",
                value: "98",
                unit: "mg/dL",
                detail: "Hoje, 07:40 · em jejum · Ana",
              },
            ].map((record) => (
              <View
                key={record.label}
                className="flex-row items-center gap-md border-b border-border pb-sm"
              >
                <View className="rounded-button bg-warning-light p-sm">
                  <Icon name={record.icon} />
                </View>
                <View className="flex-1">
                  <Text className="font-regular text-bodySmall text-text-secondary">
                    {record.label}
                  </Text>
                  <Text className="font-bold text-title text-text-primary">
                    {record.value}{" "}
                    <Text className="font-regular text-caption text-text-secondary">
                      {record.unit}
                    </Text>
                  </Text>
                  <Text className="font-regular text-caption text-text-secondary">
                    {record.detail}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="font-regular text-bodySmall text-text-secondary">
              Você ainda não tem registros de saúde.
            </Text>
          )}
          <Action
            label="Adicionar registro"
            icon="add-outline"
            onPress={() => setPanel("health")}
          />
        </Card>
      </ScrollView>

      <Modal
        transparent
        visible={panel !== null || confirmDose !== null}
        animationType="none"
        onRequestClose={closeModal}
      >
        <SafeAreaView className="flex-1 justify-center bg-text-primary/50 p-md">
          <Pressable
            accessible={false}
            className="absolute inset-0"
            onPress={closeModal}
          />
          <View
            className="w-full max-w-modal self-center gap-md rounded-modal bg-surface p-lg"
            style={{ maxHeight: "90%" }}
          >
            <View className="flex-row items-center gap-sm">
              <Text className="flex-1 font-semibold text-title text-text-primary">
                {confirmDose
                  ? "Confirmar registro"
                  : panel
                    ? panelTitles[panel]
                    : ""}
              </Text>
              <Pressable
                onPress={closeModal}
                className="min-h-touch min-w-touch items-center justify-center rounded-button"
              >
                <Icon name="close-outline" />
              </Pressable>
            </View>
            <ScrollView
              contentContainerClassName="gap-md"
              style={{ flexShrink: 1 }}
            >
              {confirmDose && (
                <>
                  <Text className="font-regular text-body text-textPrimary">
                    Registrar {confirmDose.name}, {confirmDose.dosage}, previsto
                    para {confirmDose.time}, como tomado por {patient.name}?
                  </Text>
                  <Text className="font-regular text-bodySmall text-text-secondary">
                    Esta ação altera apenas a demonstração.
                  </Text>
                  <Action
                    label="Confirmar registro"
                    icon="checkmark-outline"
                    onPress={recordDose}
                  />
                  <Action label="Cancelar" onPress={closeModal} />
                </>
              )}
              {panel === "patients" && (
                <>
                  <Text className="font-regular text-caption text-text-secondary">
                    Selecione você ou outra pessoa para ver a rotina de cuidado.
                  </Text>
                  {patients.map((item) => (
                    <Pressable
                      key={item.id}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: patientId === item.id }}
                      onPress={() => {
                        setPatientId(item.id);
                        setFilter("Todos");
                        setFeedback("");
                        closeModal();
                      }}
                      className={`min-h-button flex-row items-center gap-md rounded-button border p-md ${patientId === item.id ? "border-primary bg-green-light" : "border-transparent bg-warning-light"}`}
                    >
                      <Icon
                        name={
                          item.recipient === "self"
                            ? "person-outline"
                            : "heart-outline"
                        }
                      />
                      <View className="flex-1">
                        <Text className="font-semibold text-body text-text-primary">
                          {item.name}
                        </Text>
                        <Text className="font-regular text-caption text-text-secondary">
                          {item.recipient === "self"
                            ? "De mim · Você"
                            : "De outra pessoa · Mãe"}
                        </Text>
                      </View>
                      {patientId === item.id && (
                        <Icon name="checkmark-circle" />
                      )}
                    </Pressable>
                  ))}
                </>
              )}
              {panel === "profile" && (
                <>
                  <Text className="font-semibold text-body text-text-primary">
                    Ana Silva
                  </Text>
                  <Action
                    label="Sair da conta"
                    icon="log-out-outline"
                    onPress={() => {
                      closeModal();
                      logout();
                    }}
                  />
                </>
              )}
              {panel === "notifications" && (
                <Text className="font-regular text-caption text-text-secondary">
                  Nenhuma notificação nesta demonstração.
                </Text>
              )}
              {panel === "appointment" && (
                <Text className="font-regular text-body text-text-primary">
                  {patient.name}
                  {"\n\n"}Cardiologia · Dr. João Oliveira{"\n"}11 de setembro de
                  2026, às 14:30 (Brasília){"\n"}Clínica Vida{"\n\n"}Consulta
                  confirmada · dados demonstrativos.
                </Text>
              )}
              {panel === "history" && (
                <>
                  <Text className="font-regular text-bodySmall text-text-secondary">
                    {patient.name}
                  </Text>
                  {registered.length ? (
                    registered.map((dose) => (
                      <View key={dose.id}>
                        <Text className="font-semibold text-body text-text-primary">
                          {dose.name}
                        </Text>
                        <Text className="font-regular text-caption text-text-secondary mb-xs">
                          {dose.dosage} · previsto para {dose.time}
                        </Text>
                        <Text className="font-medium text-caption text-success-text mb-xs">
                          Registrado às {dose.recordedAt} · Guilherme
                        </Text>
                        <Action
                          label="Desfazer registro demonstrativo"
                          onPress={() => {
                            setPatients((current) =>
                              current.map((item) =>
                                item.id !== patientId
                                  ? item
                                  : {
                                      ...item,
                                      doses: item.doses.map((entry) =>
                                        entry.id === dose.id
                                          ? { ...entry, recordedAt: undefined }
                                          : entry,
                                      ),
                                    },
                              ),
                            );
                            setFeedback(
                              "Registro desfeito nesta demonstração.",
                            );
                          }}
                        />
                      </View>
                    ))
                  ) : (
                    <Text className="font-regular text-body text-text-secondary">
                      Nenhuma dose registrada.
                    </Text>
                  )}
                </>
              )}
              {panel === "health" && (
                <Text className="font-regular text-body text-text-secondary">
                  O cadastro de pressão arterial e glicemia estará disponível
                  quando os registros de saúde forem integrados. Nenhum dado foi
                  salvo.
                </Text>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
