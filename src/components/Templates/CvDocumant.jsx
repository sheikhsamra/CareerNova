// CVDocument.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  section: { marginBottom: 10 },
  text: { marginBottom: 2 },
});

const CVDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{data.fullName}</Text>
        <Text style={styles.subHeader}>{data.jobTitle}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Profile</Text>
        <Text style={styles.text}>{data.profile}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Contact</Text>
        <Text style={styles.text}>Email: {data.email}</Text>
        <Text style={styles.text}>Phone: {data.phone}</Text>
        <Text style={styles.text}>Location: {data.location}</Text>
        <Text style={styles.text}>Website: {data.website}</Text>
        <Text style={styles.text}>LinkedIn: {data.linkedIn}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {data.education.map((edu, i) => (
          <Text key={i} style={styles.text}>
            {edu.degree}, {edu.school} ({edu.year})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        {data.experience.map((exp, i) => (
          <Text key={i} style={styles.text}>
            {exp.role} at {exp.company} ({exp.year}) - {exp.desc}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        <Text>{data.skills.join(", ")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Languages</Text>
        <Text>{data.languages.join(", ")}</Text>
      </View>
    </Page>
  </Document>
);

export default CVDocument;
