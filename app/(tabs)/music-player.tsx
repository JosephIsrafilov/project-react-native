import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const tracks = [
  {
    name: "Focus Attention",
    artist: "7 Days of Calm",
    file: require("../../assets/musics/cityruins.mp3"),
  },
  {
    name: "Lovely Long Version",
    artist: "Calm Sessions",
    file: require("../../assets/musics/relax.mp3"),
  },
];

export default function MusicPlayerScreen() {
  const [trackIdx, setTrackIdx] = useState(0);
  const player = useAudioPlayer(tracks[trackIdx].file);
  const status = useAudioPlayerStatus(player);
  const [isPlaying, setIsPlaying] = useState(false);

  // === Критическая часть: останавливать предыдущий трек ===
  useEffect(() => {
    return () => {
      player.pause();
      player.seekTo(0);
    };
  }, [trackIdx]);
  // =========================================================

  useEffect(() => {
    if (status.isLoaded && isPlaying) player.play();
  }, [status.isLoaded]);

  const formatTime = (secs?: number) => {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  const handleSeek = (val: number) => player.seekTo(val);
  const seek = (s: number) => {
    if (!status.currentTime) return;
    player.seekTo(status.currentTime + s);
  };

  const prevTrack = () => setTrackIdx(i => (i === 0 ? tracks.length - 1 : i - 1));
  const nextTrack = () => setTrackIdx(i => (i === tracks.length - 1 ? 0 : i + 1));

  return (
    <View style={styles.container}>
      {/* ... твой layout ... */}
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Ionicons name="close" size={36} color="#A1A4B2" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={36} color="#A1A4B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={36} color="#A1A4B2" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.centerBlock}>
        <Text style={styles.title}>{tracks[trackIdx].name}</Text>
        <Text style={styles.artist}>{tracks[trackIdx].artist}</Text>
        <View style={styles.controlsRow}>
          <TouchableOpacity onPress={prevTrack}>
            <Ionicons name="play-skip-back" size={36} color="#8E97FD" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => seek(-15)}>
            <MaterialCommunityIcons name="rewind-15" size={36} color="#8E97FD" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => {
              if (isPlaying) {
                player.pause();
                setIsPlaying(false);
              } else {
                player.play();
                setIsPlaying(true);
              }
            }}>
            {isPlaying ? (
              <Ionicons name="pause" size={48} color="#333" />
            ) : (
              <Ionicons name="play" size={48} color="#333" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => seek(15)}>
            <MaterialCommunityIcons name="fast-forward-15" size={36} color="#8E97FD" />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextTrack}>
            <Ionicons name="play-skip-forward" size={36} color="#8E97FD" />
          </TouchableOpacity>
        </View>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={status.duration ?? 1}
          value={status.currentTime ?? 0}
          minimumTrackTintColor="#8E97FD"
          maximumTrackTintColor="#E0E0E0"
          onSlidingComplete={handleSeek}
          thumbTintColor="#8E97FD"
        />
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(status.currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(status.duration)}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCFCFC" },
  headerRow: {
    marginTop: 40,
    marginHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  centerBlock: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#393939",
    textAlign: "center",
    marginTop: 36,
    marginBottom: 0,
  },
  artist: {
    color: "#A1A4B2",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 28,
    marginTop: 4,
    textAlign: "center",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginVertical: 24,
    justifyContent: "center",
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  timeRow: { flexDirection: "row", justifyContent: "space-between", width: 300 },
  timeText: { color: "#A1A4B2", fontSize: 14 },
});

