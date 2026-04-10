import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// 🎨 Theme Colors Configuration
const THEMES = [
  { name: "Purple Dream", gradient: ["#667eea", "#764ba2"], bg: "#f0f4ff" },
  { name: "Sunset Warm", gradient: ["#fa709a", "#fee140"], bg: "#fff5f7" },
  { name: "Ocean Cool", gradient: ["#4facfe", "#00f2fe"], bg: "#f0fdff" },
  { name: "Forest Fresh", gradient: ["#38ef7d", "#11998e"], bg: "#f0fff4" },
];

export default function App() {
  // ⚡ Setup State
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [themeIndex, setThemeIndex] = useState(0);

  // Animation value
  const scaleAnim = new Animated.Value(1);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    animateCounter();
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      animateCounter();
    }
  };

  const animateCounter = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  const currentTheme = THEMES[themeIndex];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme.bg }]}
    >
      <StatusBar barStyle="dark-content" />

      {/* ==================== ✅ SCROLLVIEW WRAPPER ==================== */}
      <ScrollView
        showsVerticalScrollIndicator={true} // Tampilkan indikator scroll
        contentContainerStyle={styles.scrollContent} // Padding & styling konten
        bounces={true} // Efek bounce saat reach end
        keyboardShouldPersistTaps="handled" // Agar keyboard tidak mengganggu
      >
        {/* ==================== HEADER ==================== */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconEmoji}>🎮</Text>
          </View>
          <Text style={styles.title}>QUEST: THE MAGIC DASHBOARD</Text>
          <Text style={styles.subtitle}>Misi Membuat Aplikasi Interaktif</Text>

          {/* Badge XP */}
          <View style={styles.badgeContainer}>
            <View style={styles.badgeMain}>
              <Text style={styles.badgeText}>✅ MAIN QUEST</Text>
            </View>
            <View style={styles.badgeSide}>
              <Text style={styles.badgeText}>🔥 SIDE +25XP</Text>
            </View>
          </View>
        </View>

        {/* ==================== MISSION BRIEFING ==================== */}
        <View style={styles.briefingCard}>
          <Text style={styles.briefingTitle}>📜 Mission Briefing</Text>
          <Text style={styles.briefingText}>
            Aplikasi statis itu membosankan. Klien ingin melihat aplikasi yang{" "}
            <Text style={{ fontWeight: "bold", color: "#764ba2" }}>
              "hidup"
            </Text>
            . Tugasmu adalah membuat dashboard sederhana yang bisa merespon
            input pengguna secara{" "}
            <Text style={{ fontStyle: "italic", color: "#ec4899" }}>
              real-time
            </Text>
            .
          </Text>
        </View>

        {/* ==================== CARD 1: COUNTER SYSTEM ==================== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.featureIcon, { backgroundColor: "#dbeafe" }]}>
              <Text style={styles.featureIconText}>🔢</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>1. Counter System</Text>
              <Text style={styles.cardDesc}>
                Tombol (+) dan (-) untuk ubah angka
              </Text>
            </View>
          </View>

          {/* Counter Display */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Text
              style={[
                styles.counterNumber,
                { color: currentTheme.gradient[0] },
              ]}
            >
              {count}
            </Text>
          </Animated.View>

          {/* Tombol + dan - */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={handleDecrement}
              style={[styles.counterButton, styles.buttonMinus]}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleIncrement}
              style={[styles.counterButton, styles.buttonPlus]}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Pesan Validasi */}
          {count === 0 && (
            <Text style={styles.validationText}>
              ⚠️ Validasi: Angka tidak boleh minus (&lt; 0)
            </Text>
          )}
        </View>

        {/* ==================== CARD 2: GREETING FORM ==================== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.featureIcon, { backgroundColor: "#dcfce7" }]}>
              <Text style={styles.featureIconText}>👋</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>2. Greeting Form</Text>
              <Text style={styles.cardDesc}>
                Input nama → Sapaan berubah otomatis
              </Text>
            </View>
          </View>

          {/* TextInput untuk Nama */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Ketik nama Anda..."
            placeholderTextColor="#9ca3af"
          />

          {/* Display Greeting Real-time */}
          <View style={styles.greetingBox}>
            <Text style={styles.greetingText}>
              {name ? `🎉 Halo, ${name}!` : "✨ Menunggu nama..."}
            </Text>
            {name && (
              <Text style={styles.hintText}>✨ Real-time update aktif!</Text>
            )}
          </View>
        </View>

        {/* ==================== SIDE QUEST: TOGGLE COLOR ==================== */}
        <View
          style={[
            styles.sideQuestCard,
            { borderColor: "#f472b6", borderWidth: 2 },
          ]}
        >
          <View style={styles.sideQuestBadge}>
            <Text style={styles.sideQuestBadgeText}>🔥 SIDE QUEST (+25XP)</Text>
          </View>

          <View style={styles.cardHeader}>
            <View style={[styles.featureIcon, { backgroundColor: "#fce7f3" }]}>
              <Text style={styles.featureIconText}>🎨</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Tantangan: Toggle Color</Text>
              <Text style={styles.cardDesc}>
                Ganti warna background aplikasi
              </Text>
            </View>
          </View>

          {/* Tombol Toggle Warna */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.toggleButton,
              {
                backgroundColor: currentTheme.gradient[0],
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleButtonText}>
              ✨ Ganti Warna Background
            </Text>
          </TouchableOpacity>

          {/* Theme Indicators */}
          <View style={styles.themeIndicatorRow}>
            {THEMES.map((theme, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setThemeIndex(index)}
                style={[
                  styles.themeDot,
                  {
                    backgroundColor: theme.gradient[0],
                    opacity: themeIndex === index ? 1 : 0.5,
                    transform: [{ scale: themeIndex === index ? 1.2 : 1 }],
                  },
                ]}
              />
            ))}
          </View>

          <Text style={styles.currentThemeText}>
            Tema Aktif:{" "}
            <Text style={{ fontWeight: "bold" }}>{currentTheme.name}</Text>
          </Text>
        </View>

        {/* ==================== FOOTER INFO ==================== */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>💻 Tech Stack:</Text>
          <View style={styles.tagContainer}>
            <Text
              style={[
                styles.tag,
                { backgroundColor: "#dbeafe", color: "#1e40af" },
              ]}
            >
              ⚛️ React Native
            </Text>
            <Text
              style={[
                styles.tag,
                { backgroundColor: "#ede9fe", color: "#5b21b6" },
              ]}
            >
              ⚡ useState Hook
            </Text>
            <Text
              style={[
                styles.tag,
                { backgroundColor: "#fce7f3", color: "#be185d" },
              ]}
            >
              📱 Expo Snack
            </Text>
            <Text
              style={[
                styles.tag,
                { backgroundColor: "#d1fae5", color: "#065f46" },
              ]}
            >
              📜 ScrollView
            </Text>
          </View>
          <Text style={styles.credits}>
            ✨ The Magic Dashboard - Built with ❤️
          </Text>
          <Text style={styles.scrollHint}>
            👆 Scroll ke atas/bawah untuk lihat semua konten!
          </Text>
        </View>

        {/* ==================== ✅ AKHIR SCROLLVIEW ==================== */}
      </ScrollView>
    </SafeAreaView>
  );
}

// ==================== STYLESHEET ====================
const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ Penting: flex: 1 agar ScrollView bekerja
  },

  // ✅ STYLE UNTUK SCROLLVIEW CONTENT
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40, // Extra padding di bawah agar tidak mentok
    flexGrow: 1, // Agar konten bisa memenuhi layar
  },

  // Header Styles
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  badgeMain: {
    backgroundColor: "#10b981",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeSide: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },

  // Briefing Card
  briefingCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  briefingTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },
  briefingText: {
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 20,
  },

  // Card Styles
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  featureIconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  cardDesc: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },

  // Counter Specific
  counterNumber: {
    fontSize: 72,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  counterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonMinus: {
    backgroundColor: "#ec4899",
  },
  buttonPlus: {
    backgroundColor: "#3b82f6",
  },
  buttonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  validationText: {
    marginTop: 12,
    fontSize: 11,
    color: "#dc2626",
    textAlign: "center",
    fontStyle: "italic",
  },

  // Greeting Form Specific
  textInput: {
    borderWidth: 2,
    borderColor: "#c7d2fe",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 16,
  },
  greetingBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#7c3aed",
    textAlign: "center",
  },
  hintText: {
    marginTop: 8,
    fontSize: 12,
    color: "#059669",
  },

  // Side Quest Card
  sideQuestCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  sideQuestBadge: {
    position: "absolute",
    top: -14,
    left: 20,
    backgroundColor: "#ec4899",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  sideQuestBadgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
  toggleButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  themeIndicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 16,
  },
  themeDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  currentThemeText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 13,
    color: "#6b7280",
  },

  // Footer
  footer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  footerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 11,
    fontWeight: "600",
  },
  credits: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 8,
  },
  // ✅ HINT SCROLL BARU
  scrollHint: {
    fontSize: 11,
    color: "#6366f1",
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
});
