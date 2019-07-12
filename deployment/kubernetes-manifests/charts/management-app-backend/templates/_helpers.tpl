{{- define "management_app_backend.release_labels" }}
app: {{ printf "%s-%s" .Values.releaseApp .Values.releaseNamespace | trunc 52 }}
version: {{ .Chart.Version }}
release: {{ .Release.Name }}
{{- end }}

{{- define "management_app_backend.full_name" -}}
{{- printf "%s-%s" .Values.releaseApp .Values.releaseNamespace | trunc 52 -}}
{{- end -}}
