{{- define "feedback_collector.release_labels" }}
app: {{ printf "%s-%s" .Values.releaseApp .Values.releaseNamespace | trunc 52 }}
version: {{ .Chart.Version }}
release: {{ .Release.Name }}
{{- end }}

{{- define "feedback_collector.full_name" -}}
{{- printf "%s-%s" .Values.releaseApp .Values.releaseNamespace | trunc 52 -}}
{{- end -}}
